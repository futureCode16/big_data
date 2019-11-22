var express = require('express');
var router = express.Router();
var app = express();
var port = 8080;
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var Delete = require('./delete');
var check = require('./check');
var add = require('./addVisitor');
var retrieveAll = require('./all');
var update = require('./update');

require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

app.all('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/checking', function (req, res) {
    check(req.query,res)
})

app.put('/add',function(req,res){
    add(req.body.student,req.body.visitor,res)
})

app.put('/update/:id',function(req,res){
    update(req.params.id,req.body,res);
})

app.get('/retrieve-all',function(req,res){
    retrieveAll(req,res);
})

app.put('/delete/:id', (req, res) => {
    Delete(req.params.id,req.body.id, res);
});

http.listen(port, function () {
    console.log('listening to port: ' + port);
});