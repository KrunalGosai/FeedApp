"use strict";

const express = require('express');
const route = require('./route');
const bodyParser = require('body-parser');
const app = express();
require('./apis/socketApi')

//CORS middleware
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Tableau-Auth"); 
    // res.header("Access-Control-Request-Headers", "accept, content-type, currentuserid , currentRole");
    
    next();
  });
  
app.use(bodyParser.urlencoded({limit: '50mb',extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static('public'));

app.all('/api/*',route);

app.listen(4000, () => console.log('Example app listening on port 4000!'))