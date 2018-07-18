/*
This is the model for the user. It will contain the following:
-Username
-Password

*/

var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    budget: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget"
    }
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);

module.exports = User;