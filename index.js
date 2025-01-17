const express = require('express');

const server = express();

server.use(express.json());


//listagem inicial de bandas
const bandas = ['System of a down', 'Limp bizkit', 'Korn', 'Gojira']

server.get('/bandas', (req,res) =>{
    return res.json(bandas);
});

//middleware global
server.use((req, res) => {
    console.log('requisição chamada');
});

//localhost:3000/api
server.get('/bandas/:index', (req, res)=>{
    const { index } = req.params;

return res.json(bandas[index]);
});

//adicionando novas bandas
server.post('/bandas', (req, res) =>{
    const { nome } = req.body;
    bandas.push(nome);

    return res.json(bandas);
});

//atualizando as bandas
server.put('/bandas/:index', (req, res)=>{
    const { index } = req.params;
    const { nome } = req.body;

    bandas[index] = nome;

    return res.json(bandas);
});

//excluindo banda
server.delete('/bandas/:index', (req, res) =>{
    const { index } = req.params;

    bandas.splice(index, 1);
    return res.json(bandas);
});

server.listen(3000);
;