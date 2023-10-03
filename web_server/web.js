const express = require('express')
const path = require('path')
const fs = require('fs').promises

const server = express();

const PORT = 6004;
  
server.use(express.static('public'));

const indexPagePath = path.join(__dirname,'public', 'index.html');
const notFPath = path.join(__dirname, 'public', '404.html');


server.get('/index', async (req,res) => {
     const file = await fs.readFile(indexPagePath);
  res.status(200).sendFile(file);
})

server.all('*', (req,res) => {
res.status(404).sendFile(notFPath)

})

server.listen (PORT, () => {
console.log(`server is listening on ${PORT}`)

})
