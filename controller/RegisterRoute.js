'use strict';
let express = require('express');
let router = express.Router();
var { Register } = require('../ModelRelestion/index');
let multer = require('multer');
const path = require('path');
const Jimp = require('jimp');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
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
    res.end("this is RegisterRoute")
})
router.post('/login', (req, res) => {
    res.setHeader("content-type", "application/json")
    Register.findOne({ where: { Email: req.body.Email, Password: md5(req.body.Password), status: 0 } }).then(data => {
        if (data) {
            let newdata = {
                name: data.Name,
                Email: data.Email,
                Role: data.Role,
                UserId: data.Id,
                userAvtar: data.Avtar,
                token: jwt.sign({ email: data.Email }, 'shhhhh')
            }
            res.send(JSON.stringify(newdata, null, 2))
        } else {
            let err1 = {
                erro: "not found",
                status: 400
            }
            res.json(JSON.stringify(err1, null, 2))
        }
    }).catch(err => res.json(JSON.stringify(err)).status(400))
})
router.get('/:offset/:limit/:sortByColumn/:sortDirection', (req, res) => {
    res.setHeader("content-type", "application/json")
    let offset = parseInt(req.params.offset);
    let limit = parseInt(req.params.limit);
    let sortByColumn = req.params.sortByColumn;
    let sortDirection = req.params.sortDirection;
    Register.findAll({
        where: { status: 0 }, limit: limit,
        offset: offset,
        order: [
            [sortByColumn, sortDirection]
        ],
    }).then(data => {
        Register.count({
            where: { status: 0 }
        }).then(data1 => {
            let newdata = {
                count: data1,
                rows: data
            }
            res.send(JSON.stringify(newdata, null, 2))
        })
    })
})
router.get('/get', (req, res) => {
    res.setHeader("content-type", "application/json")
    Register.findAll({
        where: { status: 0 }
    }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.post('/save', upload.single('Avtar'), (req, res) => {
    let obj = new Register()
    obj.Name = req.body.Name;
    obj.MobilNo = req.body.MobilNo;
    obj.Email = req.body.Email;
    obj.Password = md5(req.body.Password);
    obj.Address = req.body.Address;
    obj.Role = req.body.Role;
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
        obj.Avtar = req.file.filename;
    }
    else {
        obj.Avtar = 'defaultPerson.png';
    }
    obj.save().then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.get('/Get/:id', (req, res) => {
    res.setHeader("content-type", "application/json")
    Register.findOne({
        where: { status: 0, Id: req.params.id }
    }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.delete('/remove/:id', (req, res) => {
    let data = {
        status: 1
    };
    Register.update(data, { where: { Id: req.params.id } }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.put('/edit/:id', upload.single('Avtar'), (req, res) => {
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
        req.body.Avtar = req.file.filename;
    }


    Register.update(req.body, { where: { Id: req.params.id } }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
module.exports = router;