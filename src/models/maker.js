var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');
var sharp = require('sharp');

//
// ─── MAKER MODEL SCHEMA ──────────────────────────────────────────────────────
//

var makerSchema = new mongoose.Schema({
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
    material:{
        type: String,
        required:true,
        trim:true,
        lowercase:true,
        enum:{
            values:['wood','metal','plastic','glass','concrete','other'], 
            message: 'Please choose from the given options only!'
        }
    },
    location:{
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

var Maker = mongoose.model('Maker', makerSchema);

//
// ─── MODULE EXPORT ──────────────────────────────────────────────────────────────
//

module.exports = Maker;

// ────────────────────────────────────────────────────────────────────────────────