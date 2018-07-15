var express = require('express'),
    app  = express(),
    port = 5000,
    bodyParser = require('body-parser');

var indexRoutes = require('./routes/index'),
    mainRoutes = require('./routes/main'),
    userRoutes = require('./routes/user');

//Express setup

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use(indexRoutes);
app.use(mainRoutes);
app.use(userRoutes);


app.listen(port, function(){
    console.log("App is running on port " + port);
});
