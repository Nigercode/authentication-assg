const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs')
const path = require ('path');
const { Console } = require('console');


const itemRouter = express.Router()

itemRouter.use(bodyParser.json())


//-----Get all ITEMs

itemRouter.get('/', (req, res) => {

const items = fs. readFileSync('./dataB/items.json');
res. status(200).send(items)
console.log(items)


})

//---GET ONE ITEM


itemRouter.get('/:id', (req, res) => {
    const data = fs. readFileSync('./dataB/items.json');
    const items = JSON.parse(data);
    const id = req.params.id
    const item = items.find(item => item.id == id)

    if (!item) {
        res.status(404).end("Item not found")
        return
    }
     
    res.status(200).json(item)
    
})


//------POST

itemRouter.post("/", (req, res) => {
    const data = fs. readFileSync('./dataB/items.json');
    const items = JSON.parse(data);
    const newData = req.body;
    const lastItemId = items[items.length-1].id;
    const newId = lastItemId + 1;
    const newItem = {...newData, id:newId};
    items.push(newItem)
    fs.writeFile('./dataB/items.json', JSON.stringify(items), (err)=>{
    if (err){
        res.status(500)
    
    }
    res.status(200).json(newItem)
    })

})
// ---To UPDATE

itemRouter.put('/:id', (req, res) => {
    const data = fs. readFileSync('./dataB/items.json');
    const items = JSON.parse(data);
    const newUpdate = req.body;
    console.log(newUpdate)
    const id = req.params.id;
    console.log(id)
    const index = items.findIndex(item => item.id == id)

    if (index == -1) {
        res.status(404).end("Item not found")
        return
    }
    items[index] = {...items[index], ...newUpdate}

    fs.writeFile('./dataB/items.json', JSON.stringify(items), (err)=>{
        if (err){
        res.status(500)
    
        }

    res.json(newUpdate)
     })

})

//---DELETE AN ITEM







itemRouter.delete('/:id', (req, res) => {
    const id = req.params.id
    const index = items.findIndex(item => item.id == id)
    if (index == -1) {
        res.status(404).end("item not found")
        return
    }

    books.splice(index, 1)
    res.json(items)
})


module.exports = itemRouter
