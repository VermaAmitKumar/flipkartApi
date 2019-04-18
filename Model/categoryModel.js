const Sequelize = require('sequelize');
const { mysql } = require('../confiq/confiq');
const Category = mysql.define('tbl_Category', {
    CategoryId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
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

Category.sync({ force: false }).then((res) => {
    console.log('Table Create Succesfully');
}).catch((err) => {
    console.log('Error while creating table', err);
});

module.exports = Category;