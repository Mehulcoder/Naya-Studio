
var mongoose = require('mongoose');
var validator = require('validator');
mongoose.connect('mongodb://localhost:27017/nayaStudio', {
    useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true
});