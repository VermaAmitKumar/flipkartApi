const Sequelize = require('sequelize');
const { mysql } = require('../confiq/confiq');
const Cart = mysql.define('tbl_Cart', {
    CartId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ProductId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    TotalItem: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    TotalPrize: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    PaymentStatus: {
        type: Sequelize.INTEGER,
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

Cart.sync({ force: false }).then((res) => {
    console.log('Table Create Succesfully');
}).catch((err) => {
    console.log('Error while creating table', err);
});

module.exports = Cart;