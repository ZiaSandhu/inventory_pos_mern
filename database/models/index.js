const { Sequelize } = require('sequelize');
const sequelize = require('../config');

const User = require('./user');
const Role = require('./role')
const Permission = require('./permissions')
const RolePermission = require('./rolepermissions')

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User(sequelize, Sequelize.DataTypes);
db.Permission = Permission(sequelize, Sequelize.DataTypes);
db.RolePermission = RolePermission(sequelize, Sequelize.DataTypes);
db.Role = Role(sequelize, Sequelize.DataTypes);

module.exports = db;
