var express = require('express');

//Initializing express router
var path = require('path');
var router = express.Router();
var db = require('../models');

/* 

Routes are defined as follows:

/user/ - Index GET - check user auth, display login page if not
/user/new - New GET - if no budget once user signs in
/user - Post CREATE 
/user/:id - Show GET
/user/:id/edit - Edit GET
/user/:id - Update PUT
/user/:id - Destroy DELETE
*/

// DUMMY DATA

var ISLOGGEDIN = true;

var dummyData = {
    username: "EvanTimms",
    password: "admin",
    budget : {
        cycle_amount: 500,
        remaining_amount: 335,
        spent_amount: 165,
        reset_date : "01/08/2018",
        history: [
            {
                description: "",
                amount: 75,
                transaction_date: new Date(2018,6,5)
            },
            {
                description: "",
                amount: 45,
                transaction_date: new Date(2018,6,10)
            },
            {
                description: "",
                amount: 15,
                transaction_date: new Date(2018,6,17)
            },
            {
                description: "",
                amount: 30,
                transaction_date: new Date(2018,6,23)
            }
        ]
    },
    id: "73298dhabc712hd6"
};

//INDEX
router.get('/user', function(req,res){
    // Check login status, if not logged in, display login screen, else
    // pull user data and render with main.html
    if(ISLOGGEDIN){
        res.redirect('/user/' + dummyData.id);
    }else{
        res.redirect('/login');
    }
});

// NEW, after signing up will be sent here
router.get('/user/new', function(req,res){
    res.sendFile(path.join(__dirname, '../views/user', 'new.html'));
});

// CREATE
router.post('/user', function(req,res){

});

// SHOW
router.get('/user/:id', function(req,res){
    res.send(dummyData);
});

// EDIT
router.get('/user/:id/edit', function(req,res){

});

// UPDATE
router.put('/user/:id', function(req,res){
    let userInput = req.body;
    dummyData.budget.history.push({
        description: userInput.description,
        amount: parseInt(userInput.amount),
        transaction_date: new Date(userInput.transaction_yyyy,
            userInput.transaction_mm,
            userInput.transaction_dd)
    });
    dummyData.budget.remaining_amount -= parseInt(userInput.amount);
    dummyData.budget.spent_amount += parseInt(userInput.amount);
    res.send({message: 'received'});
});

// DELETE
router.delete('/user/:id', function(req,res){

});


module.exports = router;

