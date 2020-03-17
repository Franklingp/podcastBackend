'use strict'

//Routes of users

const express = require('express');
const route = express.Router();
const userController = require('../controller/user.controller');

route.get('/test', userController.test);
route.post('/sing-up', userController.singUp);
route.post('/loggin', userController.loggIn);
route.post('/update/:id', userController.update);

module.exports = route;