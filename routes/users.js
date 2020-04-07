var express =  require('express');
var router = new express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var multer = require('multer');
var Designer = require("../models/designer");
var Maker = require('../models/maker');
var DesignerMaker = require('../models/designerMaker');
var convert = require('../middleware/convert');

//
// ─── SETTING UP MULTER ──────────────────────────────────────────────────────────
//
    
var storage = multer.diskStorage({
    
    //Setting up destination and filename for uploads
    destination: function (req, file, cb) {  
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {  
        cb(null, Date.now() + file.originalname);
    }

});

var fileFilter = (req, file,cb) => {
    
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        //accept a file
        cb(null, true);
    }else{
        //reject a file
        cb(new Error('Image file should be of "jpeg"/"png"/"jpg" format only'), false);
    }
}

var upload = multer({
    storage: storage,
    limits:{
        fieldSize: 1024*1024*6,
    },
    fileFilter: fileFilter
});

//
// ─── FORM GET ROUTE ─────────────────────────────────────────────────────────────────
//

router.get('/maker', (req, res) => {
    res.render('maker.ejs',{
        success: req.flash('success')
    });
})

// ────────────────────────────────────────────────────────────────────────────────

router.get('/designer', (req, res) => {
    res.render('designer.ejs',{
        success: req.flash('success')
    });
})

// ────────────────────────────────────────────────────────────────────────────────

router.get('/designerMaker', (req, res) => {
    res.render('designerMaker.ejs',{
        success: req.flash('success')
    });
})


//
// ─── CREATE A DESIGNER ──────────────────────────────────────────────────────────
//

router.post('/designer', upload.single('designerImage'), async (req, res) => {
    // console.log(req.file);
    var imagePath = "";
    if (req.file) {
        imagePath=req.file.path;
    }

    //creating body for object
    var data = {
        email: req.body.email,
        password: req.body.password,
        capacity: req.body.capacity,
        category: req.body.category,
        training: req.body.training,
        imageLink: req.body.imageLink,
        imagePath
    }

    try {
        var designer = new Designer(data);
        await designer.save();

        //To display flash message
        req.flash('success', 'Successfuly created User');
        res.status(200).redirect('/designer');
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};
      
            Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
            });
      
            return res.status(400).send(errors);
          }
          res.status(500).send(error);
    }
})

//
// ─── CREATE A MAKER ──────────────────────────────────────────────────────────
//

router.post('/maker',convert, upload.single('makerImage'), async (req, res) => {
    console.log(req.file);
    //Check if image is uploaded(gives no error though)
    var imagePath = "";
    if (req.file) {
        imagePath=req.file.path;
    }

    //creating body for object
    var data = {
        email: req.body.email,
        password: req.body.password,
        capacity: req.body.capacity,
        materials: req.body.materials,
        location: req.body.location,
        imageLink: req.body.imageLink,
        imagePath
    }

    try {
        var maker = new Maker(data);
        await maker.save();

        //To display flash message
        req.flash('success', 'Successfuly created User');
        res.status(200).redirect('/maker');
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};
      
            Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
            });
      
            return res.status(400).send(errors);
          }
          res.status(500).send(error);
    }
})

//
// ─── CREATE A DESIGNER+MAKER ──────────────────────────────────────────────────────────
//

router.post('/designerMaker',convert,upload.single('designerMakerImage'), async (req, res) => {
    //Check if image is uploaded(gives no error though)
    var imagePath = "";
    if (req.file) {
        imagePath=req.file.path;
    }
    //creating body for object
    var data = {
        email: req.body.email,
        password: req.body.password,
        makerCapacity: req.body.makerCapacity,
        designerCapacity: req.body.designerCapacity,
        category: req.body.category,
        material: req.body.material,
        training: req.body.training,
        location: req.body.location,
        imageLink: req.body.imageLink,
        imagePath
    }

    try {
        var designerMaker = new DesignerMaker(data);
        await designerMaker.save();

        //To display flash message
        req.flash('success', 'Successfuly created User');
        res.status(200).redirect('/designerMaker');
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};
      
            Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
            });
      
            return res.status(400).send(errors);
          }
          res.status(500).send(error);
    }
})

//
// ─── EXPORT THE ROUTES ──────────────────────────────────────────────────────────
//

module.exports = router;

// ────────────────────────────────────────────────────────────────────────────────
