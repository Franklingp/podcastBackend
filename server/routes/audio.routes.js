'use strict'

// Routes of audio

const audioController = require('../controller/audio.controller');
const express = require('express');
const route = express.Router();
//const multer = require('../middleware/multer.middleware');

//This section is to test the uploads files with multer
//This is the configure of multer to upload the audio files and the img od the songs
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if(file.fieldname === "audio"){
			cb(null, path.join(__dirname, '../uploads/audio'));
		}
		if(file.fieldname === 'image'){
			cb(null, path.join(__dirname, '../uploads/image'));
		}
	},
	filename: (req, file, cb) => {
		//cb(null, data.title + ' - ' + data.artist + path.extname(file.originalname));
		// console.log(req.body);
		// console.log(file);
		cb(null, file.originalname.split(' ')[0] + Date.now() + path.extname(file.originalname));
	}
});
const upload = multer({ 
	storage: storage,
	fileFilter: (req, file, cb) => {
		//console.log(file)
		const ext = path.extname(file.originalname);
		//console.log(ext);
		let pass = null;
		if(file.fieldname == 'audio'){
			pass = ['.mp3', '.mep3', '.aug'];
		}
		if(file.fieldname === 'image'){
			pass = ['.jpg', '.png', '.jpeg', '.gif'];
		}
		try{
			for(let i of pass){
				//console.log(i);
				if(i == ext){
					return cb(null, true);
				}
			}
			return cb(null, false);
		}
		catch(error){
			return cb(new Error('Error when the server try to upload the files'));;
		}
		
	}
});

//routes
route.get('/test', audioController.test);
route.post('/add',upload.fields([{name: 'audio', maxCount: 1}, {name: 'image', maxCount: 1}]),audioController.add);
route.get('/get/:id?', audioController.getAudio);

module.exports = route;