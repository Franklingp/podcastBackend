'use strict'

//Controller to the audio

const Audio = require('../models/audio.schema');

const audioController = {
	//Function to test
	test: function(req, res){
		return res.status(200).send({message: 'Method of test audio'});
	},

	//Function to add a song of the data base
	add: function(req, res){
		console.log(req.file);
		console.log(req.body.file);
		return res.status(200).send({message: "function to add a song"});
	}
};

module.exports = audioController;