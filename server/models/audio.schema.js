'use strict'

//Schema of a song

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audio = Schema({
	title: {type: String, lowercase: true},
	artist: {type: String, lowercase: true},
	date: {type: Date, default: Date.now()},
	image: String,
	genere: {type: String, lowercase: true},
	album: String,
	location: String
});

module.exports = mongoose.model("audio", audio);