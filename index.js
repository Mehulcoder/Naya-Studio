var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var multer = require('multer');
var routers = require('./routes/users');
var bodyParser = require("body-parser");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var path = require('path');
require('./db/mongoose');

var app = express();
var port = 3000 || process.env.PORT;

var publicDirectoryPath = path.join(__dirname,'public');
app.use(express.static(publicDirectoryPath));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs");
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave:false,
    saveUninitialized:false
}));

app.use(flash());
app.use(routers);


app.listen(port, () => {
    console.log("Server is on port " + port);
});
