'use strict';
let express = require('express');
let router = express.Router();
var { Product, Category, SubCategory, PrdouctImage } = require('../ModelRelestion/index');
let Sequelize = require('sequelize')
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
const Op = Sequelize.Op
router.get('/', (req, res) => {
    res.setHeader("content-type", "application/json")
    res.end("this is productRoute")
})

router.get('/:offset/:limit/:sortByColumn/:sortDirection', (req, res) => {
    res.setHeader("content-type", "application/json")
    let offset = parseInt(req.params.offset);
    let limit = parseInt(req.params.limit);
    let sortByColumn = req.params.sortByColumn;
    let sortDirection = req.params.sortDirection;
    Product.findAll({
        where: { status: 0 },
        include: [{
            model: Category,
            as: "category",
            attributes: ["CategoryId", "Name", "status", "createdBy", "updatedBy"]
        }, {
            model: SubCategory,
            as: "SUbCategory",
            attributes: ["SubCategoryId", "Name", "CategoryId", "status", "createdBy", "updatedBy"]
        },
        {
            model: PrdouctImage,
            as: "productIMAGE",
        }
        ],
        limit: limit,
        offset: offset,
        order: [
            [sortByColumn, sortDirection]
        ],
    }).then(data => {
        Product.count({
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
    Product.findAll({
        where: { status: 0 },
        include: [{
            model: Category,
            as: "category",
            attributes: ["CategoryId", "Name", "status", "createdBy", "updatedBy"]
        }, {
            model: SubCategory,
            as: "SUbCategory",
            attributes: ["SubCategoryId", "Name", "CategoryId", "status", "createdBy", "updatedBy"]
        },
        {
            model: PrdouctImage,
            as: "productIMAGE",
        }
        ]
    }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})

router.post('/save', upload.array('ImageName'), (req, res) => {
    let obj = new Product()
    obj.Name = req.body.Name;
    obj.Discription = req.body.Discription,
        obj.Quanity = req.body.Quanity;
    obj.CategoryId = req.body.CategoryId
    obj.SubCategoryId = req.body.SubCategoryId
    obj.Prize = req.body.Prize;
    obj.Colour = req.body.Colour;
    obj.status = 0;
    obj.createdBy = req.body.createdBy;
    obj.updatedBy = req.body.updatedBy;
    obj.save().then(data => {
        const ProductId = data.ProductId
        let files = req.files
        for (let i = 0; i < files.length; i++) {
            let obj2 = new PrdouctImage()
            obj2.ProductId = ProductId;
            obj2.createdBy = req.body.createdBy;
            obj2.updatedBy = req.body.updatedBy;
            obj2.status = 0;
            if (files[i]) {
                let imagePath = path.join(__dirname, '../assets/images/' + files[i].filename);
                let thumbnailImagePath = path.join(__dirname, '../assets/images/thumbnail/' + files[i].filename);
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
                obj2.ImageName = files[i].filename;
            }
            else {
                obj2.ImageName = 'defaultuser.png';
            }
            obj2.save()
        }
        res.send(JSON.stringify(data, null, 2))
    })
})
router.delete('/remove/:id', (req, res) => {
    let data = {
        status: 1
    };
    Product.update(data, { where: { ProductId: req.params.id } }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.put('/edit/:id', upload.array('ImageName'), (req, res) => {
    Product.update(req.body, { where: { ProductId: req.params.id } }).then(data => {
        let imagedeletedata = req.body.ids
        if (imagedeletedata.length !== 0) {
            imagedeletedata.map(data => {
                PrdouctImage.destroy({ where: { ProductImageId: data } })
            })
        }
        let files = req.files
        for (let i = 0; i < files.length; i++) {
            let obj2 = new PrdouctImage()
            obj2.ProductId = req.params.id;
            obj2.createdBy = req.body.createdBy;
            obj2.updatedBy = req.body.updatedBy;
            obj2.status = 0;
            if (files[i]) {
                let imagePath = path.join(__dirname, '../assets/images/' + files[i].filename);
                let thumbnailImagePath = path.join(__dirname, '../assets/images/thumbnail/' + files[i].filename);
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
                obj2.ImageName = files[i].filename;
            }
            else {
                obj2.ImageName = 'defaultuser.png';
            }
            obj2.save()
        }
        res.send(JSON.stringify(data, null, 2))
    })
})

router.get('/Search/:name', (req, res) => {
    res.setHeader("content-type", "application/json")
    Product.findAll({
        where: {
            name: {
                [Op.like]: req.params.name
            }
        }
        ,
        include: [{
            model: Category,
            as: "category",
            attributes: ["CategoryId", "Name", "status", "createdBy", "updatedBy"],
        }, {
            model: SubCategory,
            as: "SUbCategory",
            attributes: ["SubCategoryId", "Name", "CategoryId", "status", "createdBy", "updatedBy"],
        },
        {
            model: PrdouctImage,
            as: "productIMAGE",
        }
        ]
    }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})

module.exports = router;