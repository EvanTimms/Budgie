var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/budgie');

mongoose.Promise = Promise;

//requiring models and exporting
module.exports.User = require('./user');
module.exports.Budget = require('./budget'); 