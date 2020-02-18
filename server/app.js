'use strict'

//here is the rest of configuration

const express = require('express');
const parser = require("body-parser");
const app = express();

//Imports of routes

//Middlewares
app.use(parser.urlencoded({extended:false}));
app.use(parser.json());

//Cors configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'); //, 'Access-Control-Allow-Origin'5
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Routes

//Exports

module.exports = app;