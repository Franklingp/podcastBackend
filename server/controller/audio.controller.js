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
	//This method not validate when the user upload only the audio or only the image
	add: function(req, res){
		//console.log(req.files);
		const files = req.files;
		const request = req.body;
		if(files === undefined || Object.entries(files).length === 0 || Object.entries(files).length === 1){
			//This is not the correct status for this response
			return res.status(500).send({message: "The file is not a audio file"});
		}
		const audio = new Audio({
			title: request.title,
			artist: request.artist,
			genere: request.genere,
			album: request.album,
			image: path.join(__dirname, '../uploads/image/' + files.image[0].originalname),
			location: path.join(__dirname, '../uploads/audio/' + files.audio[0].originalname)
		});
		//console.log(audio);

		audio.save((error, result) => {
			if(error){
				return res.status(500).send({message: 'there was an error trying to save the file'});
			}
			if(!result){
				return res.status(404).send({messasge: 'Not found'});
			}else{
				return res.status(200).send({message: 'Has been saved', audio: result});
			}
		});
	}
};

module.exports = audioController;