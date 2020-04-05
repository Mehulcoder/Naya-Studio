var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var multer = require('multer');
var routers = require('./routers/users');
require('./db/mongoose');

var app = express();
var port = 3000 || process.env.PORT;

app.use(express.json());
app.use(routers);

app.listen(port, () => {
    console.log("Server is on port " + port);
});
