'use strict'

//Controller to the audio

const Audio = require('../models/audio.schema');
const path = require('path');

const audioController = {
	//Function to test
	test: function(req, res){
		return res.status(200).send({message: 'Method of test audio'});
	},

	//Function to add a song of the data base
	add: function(req, res){
		console.log(req.file);
		const file = req.file;
		const request = req.body;
		const audio = new Audio({request});
		console.log(audio);

		if(path.extname(file.originalname) !== '.mp3'){
			//This is not the correct status for this response
			return res.status(500).send({message: "The file is not a audio file"});
		}

		return res.status(200).send({message: "function to add a song"});
	}
};

module.exports = audioController;