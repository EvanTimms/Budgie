var express = require('express');
var path = require('path');
var router = express.Router();

// Main Page
router.get('/budget', function(req,res){
    res.sendFile(path.join(__dirname, '../views/main', 'main.html'));
});

module.exports = router;