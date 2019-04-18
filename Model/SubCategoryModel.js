const Sequelize = require('sequelize');
const { mysql } = require('../confiq/confiq');
const SubCategory = mysql.define('tbl_SubCategory', {
    SubCategoryId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    CategoryId: {
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

SubCategory.sync({ force: false }).then((res) => {
    console.log('Table Create Succesfully');
}).catch((err) => {
    console.log('Error while creating table', err);
});

module.exports = SubCategory;