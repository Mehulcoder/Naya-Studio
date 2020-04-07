var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');

//
// ─── MAKER MODEL SCHEMA ──────────────────────────────────────────────────────
//

var designerMakerSchema = new mongoose.Schema({
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
    designerCapacity:{
        type:Number,
        required:[true, "Designer Capacity is a required field"],
        trim:true,
        validate(value){
            if (value<0) {
                throw new Error("Designer Capacity must be greater than 0");
            }
        }
    },
    makerCapacity:{
        type:Number,
        required:[true, "Maker Capacity is a required field"],
        trim:true,
        validate(value){
            if (value<1 || !(Number.isInteger(value))) {
                throw new Error("Maker Capacity must be an integer greater than 0");
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
    training:{
        type:String,
        required:[true, "Training is a required field"],
        trim:true
    },
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