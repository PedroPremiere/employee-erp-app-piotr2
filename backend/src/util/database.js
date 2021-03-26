//will be deleted. Now it has to be , since it crashes without this line
const Sequelize = require('sequelize');

const config = require('../../config');

const sequelize = new Sequelize(config.db);

module.exports = sequelize;
