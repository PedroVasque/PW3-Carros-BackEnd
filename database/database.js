const Sequelize = require('sequelize');

const connection = new Sequelize(
    'bd_app_carro',
    'root',
    '',
    {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;