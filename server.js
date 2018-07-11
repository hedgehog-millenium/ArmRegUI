const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const path = require('path');

const index = require('./routes/index')
const registry = require('./routes/registry')

app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// app.set('views', path.join(__dirname, 'views'));

app.use('/',index)
app.use('/registry',registry)

app.listen(3000,function(){
    console.log('Listening on port 3000')
})

