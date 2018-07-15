/*
This is the model for the user. It will contain the following:
-Username
-Password

*/

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    budget: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget"
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;