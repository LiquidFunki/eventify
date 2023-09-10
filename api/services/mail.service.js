const nodemailer = require('nodemailer');
const tokenService = require('./token.service');
const { Event, Calendar } = require('../models');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendGreeting(to) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Congratulations! You have just registered in Eventify`,
      text: '',
      html: `
                <div>
                    <h1>Congratulations! You have just registered in Eventify</h1>
                </div>
            `,
    });
  }

  async sendTicket(to, paymentIntentId, eventTitle, eventId) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Your ticket for ${eventTitle}`,
      text: '',
      html: `
                <div>
                <h1>Your ticket for the event is attached to this mail! Have a great time!</h1>
                <a href="${process.env.CLIENT_URL}/event/${eventId}">click to visit event page</a>
                </div>
            `,
      attachments: [{
        filename: 'ticket.pdf',
        path: `./public/${paymentIntentId}.pdf`
      }]
    });
  }

  async sendInviteCalendar(to, token, from, calendarId) {
    const calendar = await Calendar.findById(calendarId);
    const link = `${process.env.API_URL}/api/calendar/acceptInvite/${token}`;
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `You have been invited to Calendar ${calendar.name} by ${from}`,
      text: '',
      html: `
                <div>
                <h1>Here is your invitation link. It expires in 7 days.</h1>
                <h2>${calendar.name}<h2>
                <p>${calendar.description}<p>
                <a href="${link}">click me become a participant!</a>
                </div>
            `,
    });
  }

  async sendInviteEvent(to, token, from, eventId) {
    const event = await Event.findById(eventId);
    const link = `${process.env.API_URL}/api/event/acceptInvite/${token}`;
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `You have been invited to Event ${event.name} by ${from}`,
      text: '',
      html: `
                <div>
                    <h1>Here is your invitation link. It expires in 7 days.</h1>
                    <h2>${event.name}<h2>
                    <p>${event.description}<p>
                    <a href="${link}">click me become a participant!</a>
                </div>
            `,
    });
  }

  async sendPswResetMail(to) {
    const { accessToken } = tokenService.generateTokens({ email: to });
    const link = `${process.env.CLIENT_URL}/password-reset/${accessToken}`;
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Password reset for Eventify`,
      text: '',
      html: `
                <div>
                    <h1>Follow the link to reset your password</h1>
                    <a href="${link}">click me to reset password!</a>
                </div>
            `,
    });
  }
}

module.exports = new MailService();
