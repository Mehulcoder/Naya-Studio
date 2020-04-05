var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var multer = require('multer');
var routers = require('./routes/users');
var bodyParser = require("body-parser");
var path = require('path');
require('./db/mongoose');

var app = express();
var port = 3000 || process.env.PORT;

var publicDirectoryPath = path.join(__dirname,'public');
console.log(publicDirectoryPath)
app.use(express.static(publicDirectoryPath));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(routers);
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs");

app.listen(port, () => {
    console.log("Server is on port " + port);
});
