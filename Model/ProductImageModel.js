const Sequelize = require('sequelize');
const { mysql } = require('../confiq/confiq');
const ProductImage = mysql.define('tbl_ProductImage', {
    ProductImageId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ImageName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ProductId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

ProductImage.sync({ force: false }).then((res) => {
    console.log('Table Create Succesfully');
}).catch((err) => {
    console.log('Error while creating table', err);
});
module.exports = ProductImage;