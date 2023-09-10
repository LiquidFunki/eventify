const ApiError = require('../utils/ApiError');

const { Company, User, Event } = require('../models');

module.exports.createCompany = async (userId, company) => await Company
  .create(company).then(async (docCompany) => {
    await User.findByIdAndUpdate(
      userId,
      { $push: { companies: docCompany.id } },
      { new: true, useFindAndModify: false }
    );
    return docCompany;
  });

// Read all companies
module.exports.getAllCompanies = async () => {
  const companies = await Company.find();
  return companies;
};

// Read a single company by ID
module.exports.getCompanyById = async (id) => {
  const company = await Company.findById(id)
    .populate({
      path: 'owner',
      select: 'id fullName avatar'
    })
    .populate({
      path: 'events',
      select: 'id title banner price description',
    });
  return company;
};

module.exports.getMyCompany = async (id) => {
  const company = await Company.find().where('owner').equals(id)
    .populate({
      path: 'owner',
      select: 'id fullName avatar'
    })
    .populate({
      path: 'events',
      select: 'id title banner price description',
    });
  return company;
};

// Update a company by ID
module.exports.updateCompanyById = async (id, companyData) => {
  const company = await Company.findById(id);
  if (!company) {
    throw ApiError.NothingFoundError('Company not found');
  }
  Object.assign(company, companyData);
  await company.save();
  return company;
};

// Delete a company by ID
module.exports.deleteCompanyById = async (id) => {
  await Company.findByIdAndDelete(id);
};
