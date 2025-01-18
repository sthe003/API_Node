const express = require('express');

const server = express();

server.use(express.json());


//middleware global
server.use((req, res, next) => {
    console.log(`requisição chamada: ${req.url}`);

    return next();
});

//middleware funcao
function checkBanda(req, res, next){
    if(!req.body.nome){
        return res.status(400).json({error: "É necessário informar o nome da banda"})
    }

    return next();
}

function checkIndexBanda (req,res,next){
    const banda = bandas[req.params.index]
    if(!banda){
        return res.status(400).json({error: "A banda não existe"});
    }
    return next();
}


//listagem inicial de bandas
const bandas = ['System of a down', 'Limp bizkit', 'Korn', 'Gojira']

server.get('/bandas', checkIndexBanda, (req,res) =>{
    return res.json(bandas);
});


//localhost:3000/api
server.get('/bandas/:index', (req, res)=>{
    const { index } = req.params;

return res.json(bandas[index]);
});

//adicionando novas bandas
server.post('/bandas', checkBanda, (req, res) =>{
    const { nome } = req.body;
    bandas.push(nome);

    return res.json(bandas);
});

//atualizando as bandas
server.put('/bandas/:index',  checkBanda, checkIndexBanda, (req, res)=>{
    const { index } = req.params;
    const { nome } = req.body;

    bandas[index] = nome;

    return res.json(bandas);
});

//excluindo banda
server.delete('/bandas/:index', checkIndexBanda, (req, res) =>{
    const { index } = req.params;

    bandas.splice(index, 1);
    return res.json(bandas);
});

server.listen(3000);
;