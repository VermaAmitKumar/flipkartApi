'use strict';
let express = require('express');
let router = express.Router();
var { SubCategory, Category } = require('../ModelRelestion/index');

router.get('/', (req, res) => {
    res.setHeader("content-type", "application/json")
    res.end("this is SubCategoryRoute")
})
router.get('/get/:id', (req, res) => {
    res.setHeader("content-type", "application/json")
    SubCategory.findAll({
        where: { status: 0,CategoryId:req.params.id }
        , include: [
            {
                model: Category,
                attributes: ['CategoryId', 'Name', 'CategoryId']
            }
        ]
    }
    ).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.get('/get', (req, res) => {
    res.setHeader("content-type", "application/json")
    SubCategory.findAndCountAll({
        where: { status: 0 }
        , include: [
            {
                model: Category,
                attributes: ['CategoryId', 'Name', 'CategoryId']
            }
        ]
    }
    ).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.post('/save', (req, res) => {
    let obj = new SubCategory()
    obj.Name = req.body.Name;
    obj.CategoryId = req.body.CategoryId
    obj.status = 0;
    obj.createdBy = req.body.createdBy;
    obj.updatedBy = req.body.updatedBy;
    obj.save().then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})

router.delete('/remove/:id', (req, res) => {
    let data = {
        status: 1
    };
    SubCategory.update(data, { where: { SUbCategoryId: req.params.id } }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})

router.put('/edit/:id', (req, res) => {
    SubCategory.update(req.body, { where: { SUbCategoryId: req.params.id } }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
module.exports = router;