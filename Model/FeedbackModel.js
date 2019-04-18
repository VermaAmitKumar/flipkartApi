const Sequelize = require('sequelize');
const { mysql } = require('../confiq/confiq');
const feedback = mysql.define('tbl_feedback', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
feedback.sync({ force: false }).then((res) => {
    console.log('Table Create Succesfully');
}).catch((err) => {
    console.log('Error while creating table', err);
});

module.exports = feedback;