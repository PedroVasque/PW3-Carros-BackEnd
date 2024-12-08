const express = require('express');

/* IMPORTA O MODEL DE CARRO */
const modelCarro = require('../model/modelCarro');

/* GERECIADOR DE ROTAS */
const router = express.Router();

/* ROTA DE TESTE DE CONEXÃO COM A API */
router.get('/', (req, res) => {
    return res.status(200).json({ status: 'TESTE DE CONEXÃO COM A API!' });
});

/* ROTA DE INSERÇÃO DE CARRO */
router.post('/inserirCar', (req, res) => {
    let { cod_categoria, nome_carro, cor_carro } = req.body;

    modelCarro.create({
        cod_categoria: cod_categoria,
        nome_carro: nome_carro, // Mapeia o nome_car para nome_carro
        cor_carro: cor_carro,   // Mapeia o cor_car para cor_carro
    })
    .then(() => {   
        return res.status(201).json({
            errorStatus: false,
            messageStatus: 'CARRO INSERIDO COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            messageStatus: 'HOUVE UM ERRO AO INSERIR O CARRO',
            errorObject: error
        });
    });
});

/* ROTA PARA LISTAR TODOS OS CARROS */
router.get('/listagemCar', (req, res) => {
    modelCarro.findAll()
    .then((response) => {
        return res.status(200).json({
            errorStatus: false,
            messageStatus: 'CARROS LISTADOS COM SUCESSO',
            data: response
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            messageStatus: 'HOUVE UM ERRO AO LISTAR OS CARROS',
            errorObject: error
        });
    });
});

/* ROTA PARA RECUPERAR CARRO POR CODIGO */
router.get('/listagemCar/:cod_carro', (req, res) => {
    let { cod_carro } = req.params;

    modelCarro.findByPk(cod_carro)
    .then((response) => {
        return res.status(200).json({
            errorStatus: false,
            messageStatus: 'CARRO RECUPERADO COM SUCESSO',
            data: response
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            messageStatus: 'HOUVE UM ERRO AO RECUPERAR O CARRO',
            errorObject: error
        });
    });
});

/* ROTA PARA EXCLUIR CATEGORIA */
router.delete('/excluirCarro/:cod_carro', async (req, res) => {
    let { cod_carro } = req.params;

    try {
        // Primeiro, verifique se há carros associados
        const carrosAssociados = await modelCarro.findAll({ where: { cod_carro} });

        if (carrosAssociados.length > 0) {
            // Você pode decidir excluir os carros associados primeiro
            await modelCarro.destroy({ where: { cod_carro } });
        }

        return res.status(200).json({
            errorStatus: false,
            messageStatus: 'CATEGORIA EXCLUIDA COM SUCESSO'
        });
    } catch (error) {
        return res.status(400).json({
            errorStatus: true,
            messageStatus: 'HOUVE UM ERRO AO EXCLUIR A CATEGORIA',
            errorObject: error
        });
    }
});

/* ROTA PARA ALTERAR CARRO */
router.put('/alterarCar/:cod_carro', (req, res) => {
    let { nome_carro, cor_carro, cod_categoria } = req.body;
    let { cod_carro } = req.params;

    modelCarro.update(
        {
            nome_carro,
            cor_carro,
            cod_categoria
        },
        { where: { cod_carro } }
    ).then(() => {
        return res.status(200).json({
            errorStatus: false,
            messageStatus: 'CARRO ALTERADO COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            messageStatus: 'HOUVE UM ERRO AO ALTERAR O CARRO',
            errorObject: error
        });
    });
});

module.exports = router;
