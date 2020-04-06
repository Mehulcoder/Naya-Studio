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

router.post('/designer', async (req, res) => {
    try {
        var designer = new Designer(req.body);
        await designer.save();
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
