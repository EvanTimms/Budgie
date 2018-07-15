var express = require('express');
var path = require('path');
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

// Login Route
router.get('/login', function(req,res){
    res.sendFile(path.join(__dirname, '../views/index', 'login.html'));
});

// Logout Route
router.get('/logout', function(req,res){
    //TODO: Logout logic here
});

module.exports = router;