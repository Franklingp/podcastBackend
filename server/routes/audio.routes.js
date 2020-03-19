'use strict'

// Routes of audio

const audioController = require('../controller/audio.controller');
const express = require('express');
const route = express.Router();
const multer = require('../middleware/multer.middleware');

route.get('/test', audioController.test);
route.post('/add',multer ,audioController.add);

module.exports = route;