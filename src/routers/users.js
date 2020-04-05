var express =  require('express');
var router = new express.Router();
var multer = require('multer');
var sharp = require('sharp');
var Designer = require("../models/designer");

//
// ─── VIEW ROUTE ─────────────────────────────────────────────────────────────────
//

router.get('/view', async (req, res) => {
    res.send("Hello to the page")
});

//
// ─── EXPORT THE ROUTES ──────────────────────────────────────────────────────────
//

modeule.exports = router;