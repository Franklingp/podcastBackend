'use strict'

// users Schema

const mongoose = require('mongoose');
const bcypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = Schema({
	nick: {type: String, lowercase: true},
	email: {type: String, lowercase: true},
	password: String,
	name: {type: String, lowercase: true},
	lastName: {type: String, lowercase: true},
	typeUser: Number,	// when the typeUser is 0 the user have less functions than another user that has an value of 100
	singUp: {type: Date, default: Date.now},
	image: {type: String}
});

userSchema.pre('save', function(){
	console.log(this);
	return true;
});

module.exports = mongoose.model('user', userSchema);