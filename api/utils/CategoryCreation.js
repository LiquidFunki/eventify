const { Category } = require('../models');

const eventCategories = [
  {
    name: 'Arts',
    description: 'Events related to arts: exhibitions, concerts, festivals, performances, theater shows, etc.',
  },
  {
    name: 'Sports',
    description: 'Events related to sports: competitions, tournaments, runs, marathons, etc.',
  },
  {
    name: 'Cultural',
    description: 'Events related to culture: festivals, traditional holidays, city days, contests, etc.',
  },
  {
    name: 'Business',
    description: 'Events related to business: conferences, seminars, trainings, exhibitions, business meetings, etc.',
  },
  {
    name: 'Educational',
    description: 'Events related to education: lectures, seminars, trainings, workshops, etc.',
  },
  {
    name: 'Technology',
    description: 'Events related to technology: conferences, exhibitions, hackathons, innovation meetings, etc.',
  },
  {
    name: 'Medical',
    description: 'Events related to medicine: conferences, symposiums, seminars, workshops, etc.',
  },
  {
    name: 'Gastronomic',
    description: 'Events related to gastronomy: festivals, tastings, workshops, exhibitions, etc.',
  },
  {
    name: 'Entertainment',
    description: 'Events related to entertainment: parties, concerts, shows, festivals, exhibitions, etc.',
  },
];

async function populateCategories() {
  try {
    await Category.deleteMany({});
    await Category.insertMany(eventCategories);
    console.log('Event categories successfully populated!');
  } catch (err) {
    console.error(err);
  }
}

module.exports = Category;
module.exports.populateCategories = populateCategories;
