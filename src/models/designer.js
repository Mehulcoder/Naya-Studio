var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');
var sharp = require('sharp');

//
// ─── DESIGNER MODEL SCHEMA ──────────────────────────────────────────────────────
//

var designerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Please enter a valid E-mail!");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isLength(value,{min:6,max:1000}))
            {
                throw Error("Minimum length of the password must be 6");
            }

            if(value.toLowerCase().includes('password')){
                throw Error('The password should not contain the keyword "password"!');
            }
        }
    },
    capacity:{
        type:Number,
        required:true,
        trim:true,
        validate(value){
            if (value<0) {
                throw new Error("Capacity must be a positive number");
            }
        }
    },
    category:{
        type: String,
        required:true,
        trim:true,
        lowercase:true,
        enum:{
            values:['furniture designer','architect','interior designer','industrial designer','designer maker','other'], 
            message: 'Please choose from the given options only!'
        }
    },
    training:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    }
},{
    timestamps:true
})

//
// ─── MODEL THE SCHEMA ─────────────────────────────────────────────────────────────
//    

var Designer = mongoose.model('Designer', designerSchema);

//
// ─── MODULE EXPORT ──────────────────────────────────────────────────────────────
//

module.exports = Designer;

// ────────────────────────────────────────────────────────────────────────────────