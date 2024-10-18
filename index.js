const express = require('express');
const cors = require('cors');

const routerCarro = require('./route/routesCarro');
const routesCategoria = require('./route/routesCategoria');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', routerCarro);
app.use('/', routesCategoria);

app.listen(5000, ()=>{
    console.log('SERVIDOR RODANDO EM - http://localhost:5000');
});