var express =  require('express');
var router = new express.Router();
var multer = require('multer');
var sharp = require('sharp');
var Designer = require("../models/designer");
var Maker = require('../models/maker');
var DesignerMaker = require('../models/designerMaker');

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
    try {
        var designer = new Designer(req.body);
        await designer.save();
        res.status(200).send(designer);
    } catch (error) {
        res.status(400).send(error);
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
        res.status(400).send(error);
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
        res.status(400).send(error);
    }
})

//
// ─── EXPORT THE ROUTES ──────────────────────────────────────────────────────────
//

module.exports = router;

// ────────────────────────────────────────────────────────────────────────────────
