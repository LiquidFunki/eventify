/* eslint-disable max-len */
const { validationResult } = require('express-validator');

const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');
const eventService = require('../services/event.service');
const mailService = require('../services/mail.service');
const ApiError = require('../utils/ApiError');

const createEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.InvalidDataError('validation error', errors.array())
      );
    }
    const { organizer } = req.body;
    const event = await eventService.createEvent(organizer, req.body);

    return res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const event = await eventService.updateEvent(
      req.user.id,
      req.params.id,
      req.body
    );

    return res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    const result = await eventService.getAllEvents();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getAllCompanyEvents = async (req, res, next) => {
  try {
    const result = await eventService.getAllCompanyEvents(req.params.companyId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getMyEvents = async (req, res, next) => {
  try {
    const result = await eventService.getMyEvents(req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getTodayEvents = async (req, res, next) => {
  try {
    const result = await eventService.getTodayEvents(req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const result = await eventService.getCategories();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const result = await eventService.getEventById(req.params.id);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    await eventService.deleteEvent(req.user.id, id);
    res.status(204).json({ message: 'Event deleted successfully' });
  } catch (err) {
    next(err);
  }
};

const subscribeEvent = async (req, res, next) => {
  try {
    if (req.body) {
      const eventId = req.params.id;
      const {
        paymentIntentId,
        price,
        title,
        startEvent,
        endEvent
      } = req.body;
      const { email, fullName } = req.user;

      const doc = new PDFDocument({ font: `./public/fonts/Anonymous_Pro.ttf` });
      doc.pipe(fs.createWriteStream(`./public/${paymentIntentId}.pdf`));

      const qrCodeData = `${process.env.CLIENT_URL}/event/${eventId}`;
      const qrCodeOptions = {
        margin: 1,
        scale: 8,
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
      };
      const qrCodeImageBuffer = await QRCode.toBuffer(
        qrCodeData,
        qrCodeOptions
      );
      doc.image(qrCodeImageBuffer, 50, 70, { width: 100, height: 100 });

      doc
        .fontSize(16)
        .font(`./public/fonts/Anonymous_Pro_B.ttf`)
        .text(`${title}`, 180, 50)
        .moveDown()
        .fontSize(14)
        .text(`price:${price}$`)
        .moveDown()
        .text(`user:  ${fullName}`)
        .moveDown()
        .text(`${startEvent}  -  ${endEvent}`)
        .moveDown()
        .text(`Payment ID: ${paymentIntentId}`);

      doc
        .moveTo(0, 200)
        .lineTo(650, 200)
        .dash(5, { space: 2 })
        .stroke()
        .undash();

      doc.end();

      mailService.sendTicket(email, paymentIntentId, title, eventId);
    }
    const { id } = req.params;
    const event = await eventService.subscribeEvent(req.user.id, id);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

const unsubscribeEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await eventService.unsubscribeEvent(req.user.id, id);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
  getAllCompanyEvents,
  getMyEvents,
  getTodayEvents,
  getCategories,
  getEvent,
  deleteEvent,
  subscribeEvent,
  unsubscribeEvent,
};
