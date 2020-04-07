var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');

//
// ─── MAKER MODEL SCHEMA ──────────────────────────────────────────────────────
//

var makerSchema = new mongoose.Schema({
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
            if (value<1 || !(Number.isInteger(value))) {
                throw new Error("Capacity must be an integer greater than 0");
            }
        }
    },
    materials:[
        {
            type: String,
            required:[true, "Material is a required field"],
            trim:true,
            lowercase:true,
            enum:{
                values:['wood','metal','plastic','glass','concrete','other'], 
                message: 'Please choose from the given options only!'
            }
        }
    ],
    location:{
        type:String,
        required:[true, "Location is a required field"],
        trim:true,
        lowercase:true
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

makerSchema.pre('save', async function (next) {  
    
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

var Maker = mongoose.model('Maker', makerSchema);

//
// ─── MODULE EXPORT ──────────────────────────────────────────────────────────────
//

module.exports = Maker;

// ────────────────────────────────────────────────────────────────────────────────