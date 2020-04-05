var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');
var sharp = require('sharp');

//
// ─── MAKER MODEL SCHEMA ──────────────────────────────────────────────────────
//

var designerMakerSchema = new mongoose.Schema({
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
            if (value<1 || !(Number.isInteger(value))) {
                throw new Error("Capacity must be an integer greater than 0");
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
    training:{
        type:String,
        required:true,
        trim:true
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
// ─── PASSWORD HASHING ───────────────────────────────────────────────────────────
//

designerMakerSchema.pre('save', async function (next) {  
    
    //Check if the passoword is changed
    //If yes than hash it
    
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password,8);
    }
    next();
})

//
// ─── MODEL THE SCHEMA ─────────────────────────────────────────────────────────────
//    

var DesignerMaker = mongoose.model('DesignerMaker', designerMakerSchema);

//
// ─── MODULE EXPORT ──────────────────────────────────────────────────────────────
//

module.exports = DesignerMaker;

// ────────────────────────────────────────────────────────────────────────────────