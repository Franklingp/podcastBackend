'use strict'

//Controller to the audio

const Audio = require('../models/audio.schema');
const path = require('path');
const config = require('../config');
const validate = require('../service/validate');
const fs = require('fs');

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
	},

	//Method to delete the data of an audio
	updateAudio: function(req, res){
		const id = req.params.id;
		let data = JSON.parse(JSON.stringify(req.body));
		let files = req.files;
		// console.log(data);
		// console.log(req.files);

		if(JSON.stringify(files) === '{}'){
			Audio.findByIdAndUpdate(id, data, {new: true, useFindAndModify: false}).exec((error, result) => {
				if(error){
					return res.status(500).send({message: 'Error when trying to update'});
				}
				if(!result){
					return res.status(404).send({message: 'Not found'});
				}else{
					return res.status(200).send({message: "Success", audio: result});
				}
			});
		}else{
			Audio.findById(id).exec((error, audio) => {
				if(error){	return res.status(500).send({message: 'Error in the server'});	}
				if(!audio) {	return res.status(404).send({message: 'The audio not found'});	}
				else{
					//This is to validate the files to update
					let arrayFiles = Object.keys(files);
					for(let file of arrayFiles){
						if(file === "audio"){
							data.location = config.url + '/uploads/audio/' + files.audio[0].filename;
							fs.unlink(files.audio[0].destination + '/' + audio.location.split('/')[5], function(err){
								if(error){	return res.status(500).send({message: 'Error in the server'});	}
								//console.log('The audio was deleted');
							});
						}
						if(file === "image"){
							data.image = config.url + '/uploads/image/' + files.image[0].filename;
							fs.unlink(files.image[0].destination + '/' + audio.image.split('/')[5], function(err){
								if(error){	return res.status(500).send({message: 'Error in the server'});	}
								//console.log('The image was deleted');
							});
						}
					}

					//In this section i set the new data of the user to the schema to save lather
					const arrayData = Object.keys(data);
					for(let i of arrayData){
						switch(i){
							case 'title':
								audio.title = data.title;
								break;
							case 'album':
								audio.album = data.album;
								break;
							case 'artist':
								audio.artist = data.artist;
								break;
							case 'location':
								audio.location = data.location;
								break;
							case 'image':
								audio.image = data.image;
								break;
							case 'genere':
								audio.genere = data.genere;
								break;
							default:
								continue;
						}
					}
					audio.save((error, result) => {	return validate(error, result, res); });
				}
			});
			
		}		
	}
};

module.exports = audioController;