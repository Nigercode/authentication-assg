const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')

const itemsRouter = require('./Route/items.js');

const PORT = 3000;
const app = express();


app.use('/items', itemsRouter);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
