const express = require('express');

const server = express();


const bandas = ['System of a down', 'Limp bizkit', 'Korn', 'Gojira']

server.get('/bandas', (res,rest) =>{
    return rest.json(cursos);
});

//localhost:3000/api
server.get('/api/:index', (req, rest)=>{
    const { index } = req.params;

return rest.json(bandas[index]);
})

server.listen(3000);
