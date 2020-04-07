var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');

//
// ─── DESIGNER MODEL SCHEMA ──────────────────────────────────────────────────────
//

var designerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, "Email is a required field"],
        trim:true,
        lowercase:true,
        unique:true,
        validate: [validator.isEmail, "Please enter a valid E-mail!" ]
    },
    password:{
        type:String,
        required:[true, "Password is a required field"],
        minlength: 6,
        maxlength:1000,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw Error('The password should not contain the keyword "password"!');
            }
        }
    },
    capacity:{
        type:Number,
        required:[true, "Capacity is a required field"],
        trim:true,
        validate(value){
            if (value<0) {
                throw new Error("Capacity must be greater than 0");
            }
        }
    },
    category:{
        type: String,
        required:[true, "Category is a required field"],
        trim:true,
        lowercase:true,
        enum:{
            values:['furniture designer','architect','interior designer','industrial designer','designer maker','other'], 
            message: 'Please choose from the given options only!'
        }
    },
    training:{
        type:String,
        required:[true, "Training is a required field"],
        trim:true
    },
    imageLink:{
        type:String,
        trim:true
    },
    imagePath:{
        type:String
    }
},{
    timestamps:true
})

//
// ─── PASSWORD HASHING ───────────────────────────────────────────────────────────
//

designerSchema.pre('save', async function (next) {  
    
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

var Designer = mongoose.model('Designer', designerSchema);

//
// ─── MODULE EXPORT ──────────────────────────────────────────────────────────────
//

module.exports = Designer;

// ────────────────────────────────────────────────────────────────────────────────