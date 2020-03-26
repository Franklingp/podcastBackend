'use strict'

//Controller to the audio

const Audio = require('../models/audio.schema');
const path = require('path');
const config = require('../config');
const validate = require('../service/validate');

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
			image: config.url + '/uploads/image/' + files.image[0].filename,
			location: config.url + '/uploads/audio/' + files.audio[0].filename,
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
	},

	//Method to get an audio to the server
	getAudio: function(req, res){
		let id = null;
		id = req.params.id;
		// console.log(id);
		if(id){
			Audio.findById(id).exec((error, result) => {
				if(error){return res.status(500).send({message: 'There was an error trying to get the file'});}
				if(!result){return res.status(404).send({message: 'The audio not found'});}
				else{
					return res.status(200).send({audio: result});
				}
			});
		}else{
			let key = String(req.body.key);
			let value = String(req.body.value);

			switch(key){
				case 'title': 
					Audio.find({title: value}).sort('-date').exec((error, result) => {return validate(error, result, res)});
					break;
				case 'album': 
					Audio.find({album: value}).sort('-date').exec((error, result) => {return validate(error, result, res)});
					break;
				case 'artist': 
					Audio.find({artist: value}).sort('-date').exec((error, result) => {return validate(error, result, res)});
					break;
				case 'genere': 
					Audio.find({genere: value}).sort('-date').exec((error, result) => {return validate(error, result, res)});
					break;
				default:
					Audio.find({}).sort('-date').exec((error, result) => {return validate(error, result, res)});
					break;
			}
		}
	}
};

module.exports = audioController;