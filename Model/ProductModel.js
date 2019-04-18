const Sequelize = require('sequelize');
const { mysql } = require('../confiq/confiq');
const Product = mysql.define('tbl_Product', {
    ProductId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Discription: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Quanity: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    CategoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    SubCategoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    Prize: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    Colour: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Product.sync({ force: false }).then((res) => {
    console.log('Table Create Succesfully');
}).catch((err) => {
    console.log('Error while creating table', err);
});

module.exports = Product;