const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');

const server = http.createServer(app);



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Declare Api routes
 */
const listApi = require('./Api/ShoppingList');
const itemApi = require('./Api/ShoppingItems');
app.use('/list', listApi);
app.use('/item', itemApi);

app.get('/', function (req, res) {
    res.json({ n: "noiq" })
});

server.listen(3000, function () {
    console.log("Server started on 3000");
});

module.exports = server;