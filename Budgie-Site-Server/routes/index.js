var express = require('express');
var path = require('path');
var User = require("../models").User;
var passport = require('passport');
var router = express.Router();

// Landing Page
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../views/index', 'root.html'));
});

// About Route
router.get('/about', function(req,res){
    res.sendFile(path.join(__dirname, '../views/index', 'about.html'));
});

// Contact Route
router.get('/contact', function(req,res){
    res.sendFile(path.join(__dirname, '../views/index', 'contact.html'));
});

// -----------
// AUTH ROUTES 
// -----------

// Login Route
router.get('/login', function(req,res){
    res.sendFile(path.join(__dirname, '../views/index', 'login.html'));
});

router.post('/login', passport.authenticate("local", {
    succesRedirect: "/budget",
    failureRedirect: "/login"
}), (req,res)=>{});

// Logout Route
router.get('/logout', function(req,res){
    //TODO: Logout logic here
    req.logout();
    res.redirect("/login");
});

//Signup Route
router.get('/signup', function(req,res){
    res.sendFile(path.join(__dirname, '../views/index', 'signup.html'));
});

//NEW USER ROUTE
router.post('/signup', function(req,res){
    let newUser = new User({username:req.body.username});

    //using mongoose register method
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            return res.send(err);
        }

        passport.authenticate('local'),
        function(req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.redirect('/users/new');
        };
    })
    .catch((e)=> console.log(e));
    
    
});

module.exports = router;