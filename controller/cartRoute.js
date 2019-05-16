'use strict';
let express = require('express');
let router = express.Router();
var { Cart, Product, PrdouctImage, Register } = require('../ModelRelestion/index');

router.get('/', (req, res) => {
    res.setHeader("content-type", "application/json")
    res.end("this is cart")
})
router.get('/Get', (req, res) => {
    res.setHeader("content-type", "application/json")
    // let token = req.header('Authorization');
    // if (token) {
    Cart.findAndCountAll({
        where: { status: 0 },
        include: [
            {
                model: Product,
                include: {
                    model: PrdouctImage,
                    as: "productIMAGE",
                }
            },
            {
                model: Register
            }
        ]
    }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
    // }else{
    //     res.status(403);
    //     let data={
    //         error:"not aunthenticate"
    //     }
    //     res.send(JSON.stringify(data, null, 2))
    // }
})
router.get('/Get/:id', (req, res) => {
    res.setHeader("content-type", "application/json")
    Cart.findOne({
        where: { status: 0, CartId: req.params.id }
    }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.post('/Save', (req, res) => {
    Cart.findOne({
        where: { status: 0, ProductId: req.body.ProductId, Id: req.body.Id, PaymentStatus: 0 }
    }).then(data => {
        if (data) {
            // Cart.update( { where: { CartId: data.CartId } }).then(data1 => {
            Cart.findOne({
                where: { status: 0, CartId: data.CartId },
                include: [
                    {
                        model: Product,
                        include: {
                            model: PrdouctImage,
                            as: "productIMAGE",
                        }
                    },
                    {
                        model: Register
                    }
                ]
            }).then(data => {
                res.send(JSON.stringify(data, null, 2))
            })

            // })
        } else {
            let obj = new Cart()
            obj.ProductId = req.body.ProductId;
            obj.Id = req.body.Id;
            obj.TotalItem = req.body.TotalItem;
            obj.TotalPrize = req.body.TotalPrize;
            obj.PaymentStatus = req.body.PaymentStatus;
            obj.status = 0;
            obj.createdBy = req.body.createdBy;
            obj.updatedBy = req.body.updatedBy;
            obj.save().then(data => {
                console.log(data.CartId);
                Cart.findOne({
                    where: { status: 0, CartId: data.CartId },
                    include: [
                        {
                            model: Product,
                            include: {
                                model: PrdouctImage,
                                as: "productIMAGE",
                            }
                        },
                        {
                            model: Register
                        }
                    ]
                }).then(data => {
                    res.send(JSON.stringify(data, null, 2))
                })
            })
        }
    })
})
router.delete('/remove/:id', (req, res) => {
    let data = {
        status: 1
    };
    Cart.update(data, { where: { CartId: req.params.id } }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.put('/edit/:id', (req, res) => {
    Cart.update(req.body, { where: { CartId: req.params.id } }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.get('/orderGet/:id', (req, res) => {
    res.setHeader("content-type", "application/json")
    let sortByColumn = "CartId";
    let sortDirection = "desc";
    Cart.findAndCountAll({
        where: { Id: req.params.id },
        include: [
            {
                model: Product,
                include: {
                    model: PrdouctImage,
                    as: "productIMAGE",
                }
            },
            {
                model: Register
            }
        ],
        order: [
            [sortByColumn, sortDirection]
        ]
    }).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
module.exports = router;