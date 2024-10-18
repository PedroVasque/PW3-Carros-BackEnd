const Sequelize = require('sequelize');

const connection = require('../database/database');

const modelCategoria = require('./modelCategoria')



const modelCarro = connection.define(
    'tbl_carro',
    {
        cod_carro:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        cod_categoria:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nome_carro:{
            type:Sequelize.STRING(100),
            allowNull:true
        },
        cor_carro:{
            type:Sequelize.STRING(100),
            allowNull:true
        },
    }
);

/*Implementação da  CHAVE ESTRANGEIRA - LADO N*/
modelCategoria.hasMany(modelCarro, {
    foreignKey: 'cod_categoria',
    sourceKey: 'cod_categoria'
});

/*Implementação da  CHAVE PRIMÁRIA - LADO 1*/
modelCarro.belongsTo(modelCategoria, {
    foreignKey: 'cod_categoria',
    sourceKey: 'cod_categoria'
});

modelCarro.sync({force:true});

module.exports = modelCarro;