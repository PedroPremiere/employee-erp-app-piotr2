const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    admin: { type: Sequelize.BOOLEAN, allowNull: false },
    birthDate: { type: Sequelize.DATEONLY, allowNull: false }
});

module.exports = User;
