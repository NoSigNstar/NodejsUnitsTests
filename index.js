var express = require('express')
var app = express()
var api = require('./Api/dummy.js')
 
app.get('/', function (req, res) {
  res.send('Hello mon tp de test')
})
app.get('/products', function(req, res) {
  res.send(api);
})
 
app.listen(3000)