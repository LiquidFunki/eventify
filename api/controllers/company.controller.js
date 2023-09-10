// const uuid = require('uuid');
const companyService = require('../services/company.service');
const ApiError = require('../utils/ApiError');
// const mailService = require('../services/mail.service');

// Create a new company
module.exports.createCompany = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return next(ApiError.BadRequestError('validation error'));
    }
    const company = await companyService.createCompany(req.user.id, {
      ...req.body,
      owner: req.user.id,
    });
    res.status(201).json(company);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Read all companies
module.exports.getAllCompanies = async (req, res, next) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.json(companies);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Read a single company by ID
module.exports.getCompanyById = async (req, res, next) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) {
      return next(ApiError.NothingFoundError('Company not found'));
    }
    res.json(company);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports.getMyCompany = async (req, res, next) => {
  try {
    const company = await companyService.getMyCompany(req.user.id);
    if (!company) {
      return next(ApiError.NothingFoundError('Company not found'));
    }
    res.json(company);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Update a company by ID
module.exports.updateCompanyById = async (req, res, next) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) {
      return next(ApiError.NothingFoundError('Company not found'));
    }
    const {
      name, location, description, logoUrl, websiteUrl
    } = req.body;
    if (!name && !location && !description && !logoUrl && !websiteUrl) {
      return next(
        ApiError.BadRequestError('At least one field must be updated')
      );
    }
    const updatedCompany = await companyService.updateCompanyById(
      req.params.id,
      req.body
    );
    res.json(updatedCompany);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Delete a company by ID
module.exports.deleteCompanyById = async (req, res, next) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    await companyService.deleteCompanyById(req.params.id);
    res.json({ msg: 'Company deleted' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
