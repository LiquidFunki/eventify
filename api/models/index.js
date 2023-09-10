const mongoose = require('mongoose');
const { companySchema } = require('./Company');
const { categorySchema } = require('./Category');
const { eventSchema } = require('./Event');
const { commentSchema } = require('./Comment');
const { promocodeSchema } = require('./Promocode');
const { tokenSchema } = require('./Token');
const { userSchema } = require('./User');

const InitDB = async () => {
  await mongoose.connect(process.env.DB_URI).then(() => { console.log('DB connection === OK'); });
};

module.exports.Company = mongoose.model('Company', companySchema, 'company');
module.exports.Promocode = mongoose.model('Promocode', promocodeSchema, 'promocode');
module.exports.Category = mongoose.model('Category', categorySchema, 'category');
module.exports.Event = mongoose.model('Event', eventSchema, 'event');
module.exports.Comment = mongoose.model('Comment', commentSchema, 'comment');
module.exports.Token = mongoose.model('Token', tokenSchema, 'token');
module.exports.User = mongoose.model('User', userSchema, 'user');
module.exports.InitDB = InitDB;
