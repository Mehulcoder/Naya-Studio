var convert = async (req, res, next) => {
    try {
        var arr = new Array();
        var materials = req.body.materials;
        if (typeof(materials) === 'string') {
            arr.push(materials);
            req.body.materials = arr;
        }
        next();
    } catch (error) {
        res.status(401).send({error:"Conversion failed"});
    }
}

module.exports = convert;