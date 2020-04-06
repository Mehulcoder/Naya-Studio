var express =  require('express');
var router = new express.Router();
var multer = require('multer');
var sharp = require('sharp');
var Designer = require("../models/designer");
var Maker = require('../models/maker');
var DesignerMaker = require('../models/designerMaker');

//
// ─── LANDING ROUTE ──────────────────────────────────────────────────────────────
//


//
// ─── FORM GET ROUTE ─────────────────────────────────────────────────────────────────
//

router.get('/maker', (req, res) => {
    res.render('maker.ejs')
})

// ────────────────────────────────────────────────────────────────────────────────

router.get('/designer', (req, res) => {
    res.render('designer.ejs')
})

// ────────────────────────────────────────────────────────────────────────────────

router.get('/designerMaker', (req, res) => {
    res.render('designerMaker.ejs')
})

//
// ─── VIEW ROUTE ─────────────────────────────────────────────────────────────────
//

router.get('/view', async (req, res) => {
    res.send("Hello to the page")
});

//
// ─── CREATE A DESIGNER ──────────────────────────────────────────────────────────
//

router.post('/designer', async (req, res) => {
    console.log(req.body);
    try {
        var designer = new Designer(req.body);
        await designer.save();
        res.status(200).send(designer);
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

router.post('/maker', async (req, res) => {
    try {
        var maker = new Maker(req.body);
        await maker.save();
        res.status(200).send(maker);
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

router.post('/designerMaker', async (req, res) => {
    try {
        var designerMaker = new DesignerMaker(req.body);
        await designerMaker.save();
        res.status(200).send(designerMaker);
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
