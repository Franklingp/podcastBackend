'use strict'

//main index
//Here id the configuration of port and the conection with the database using mongoose
//In this proyect, i use node JS to build the backend.

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/podcast", {useNewUrlParser: true})
	
	then(() => {
		console.log("the database has successfully connected");
		app.listen(port => {
			console.log('the server is running in port: '+ port);
		})
	})

	.catch((error) => {	console.log(error)	});