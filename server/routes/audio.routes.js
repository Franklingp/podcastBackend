'use strict'

// Routes of audio

const audioController = require('../controller/audio.controller');
const express = require('express');
const route = express.Router();
//const multer = require('../middleware/multer.middleware');

//This section is to test the uploads files with multer
//This is the configure of multer to upload the audio files
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../uploads/audio'));
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname);
	}
});
const upload = multer({ storage: storage });

//routes
route.get('/test', audioController.test);
route.post('/add',upload.single('audio') ,audioController.add);

module.exports = route;