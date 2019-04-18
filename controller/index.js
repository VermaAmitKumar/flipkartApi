let express = require('express');
let router = express.Router();
router.get('/', function (req, res) {
    res.send('this is base route');
});
router.use('/Category', require('./CategoryRoute'));
router.use('/SubCategory', require('./SubCategoryRoute'));
router.use('/user', require('./RegisterRoute'));
router.use('/product', require('./ProductRoute'));
router.use('/productImage', require('./ProductImageRoute'));    
router.use('/Cart', require('./cartRoute'));    
module.exports = router;