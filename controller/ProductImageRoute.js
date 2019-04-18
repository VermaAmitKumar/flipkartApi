'use strict';
let express = require('express');
let router = express.Router();
var { PrdouctImage, Product } = require('../ModelRelestion/index');
let multer = require('multer');
const path = require('path');
const Jimp = require('jimp');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({
    storage
});
router.get('/', (req, res) => {
    res.setHeader("content-type", "application/json")
    res.end("this is ProductImageRoute")
})
router.get('/get', (req, res) => {
    res.setHeader("content-type", "application/json")
    PrdouctImage.findAll({
        where: { status: 0 },
        include: [{
            model: Product,
        }]
    }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.post('/save', upload.single('ImageName'), (req, res) => {
    let obj = new PrdouctImage()
    obj.ImageName = req.body.ImageName;
    obj.ProductId = req.body.ProductId;
    obj.createdBy = req.body.createdBy;
    obj.updatedBy = req.body.updatedBy;
    obj.status = 0;

    if (req.file) {
        let imagePath = path.join(__dirname, '../assets/images/' + req.file.filename);
        let thumbnailImagePath = path.join(__dirname, '../assets/images/thumbnail/' + req.file.filename);
        Jimp.read(imagePath)
            .then(result => {
                return result
                    .resize(100, 70) // resize
                    .quality(100) // set JPEG quality
                    .write(thumbnailImagePath); // save
            })
            .catch(err => {
                console.error(err);
            });
        obj.ImageName = req.file.filename;
    }
    else {
        obj.ImageName = 'defaultuser.png';
    }
    obj.save().then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.put('/remove', (req, res) => {
    let ids = req.body
    ids.map(data => {
        PrdouctImage.update(data, { where: { ProductImageId: data } }).then(data => {
            res.send(JSON.stringify(data, null, 2))
        })
    })
})
router.put('/edit/:id', upload.single('ImageName'), (req, res) => {
    console.log(req.body);
    if (req.file) {
        let imagePath = path.join(__dirname, '../assets/images/' + req.file.filename);
        let thumbnailImagePath = path.join(__dirname, '../assets/images/thumbnail/' + req.file.filename);
        Jimp.read(imagePath)
            .then(result => {
                return result
                    .resize(100, 70)
                    .quality(100)
                    .write(thumbnailImagePath);
            })
            .catch(err => {
                console.error(err);
            });
        req.body.ImageName = req.file.filename;
    }
    else {
        req.body.ImageName = 'defaultuser.png';
    }
    PrdouctImage.update(req.body, { where: { ProductImageId: req.params.id } }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
module.exports = router;
