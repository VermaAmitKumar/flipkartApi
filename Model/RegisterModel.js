const Sequelize = require('sequelize');
const { mysql } = require('../confiq/confiq');
const Register = mysql.define('tbl_Register', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    MobilNo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Role:{
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Avtar: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Register.sync({ force: false }).then((res) => {
    console.log('Table Create Succesfully');
}).catch((err) => {
    console.log('Error while creating table', err);
});

module.exports = Register;