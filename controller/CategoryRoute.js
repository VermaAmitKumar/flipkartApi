'use strict';
let express = require('express');
let router = express.Router();
var { Category } = require('../ModelRelestion/index');

router.get('/', (req, res) => {
    res.setHeader("content-type", "application/json")
    res.end("this is CategoryRoute")
})

router.get('/Get', (req, res) => {
    res.setHeader("content-type", "application/json")
    Category.findAll({ where: { status: 0 } }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.post('/Save', (req, res) => {
    let obj = new Category()
    obj.Name = req.body.Name;
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
    Category.update(data, { where: { CategoryId: req.params.id } }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.put('/edit/:id', (req, res) => {
    Category.update(req.body,{ where: { CategoryId: req.params.id } }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
module.exports = router;