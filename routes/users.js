var express =  require('express');
var router = new express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var multer = require('multer');
var sharp = require('sharp');
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
        cb(null, new Date().toISOString() + file.originalname);
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
    console.log(req.file);
    try {
        var designer = new Designer(req.body);
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

router.post('/maker',convert, async (req, res) => {
    try {
        var maker = new Maker(req.body);
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

router.post('/designerMaker',convert, async (req, res) => {
    try {
        var designerMaker = new DesignerMaker(req.body);
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
