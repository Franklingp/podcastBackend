'use strict'

//Service to validate the and return the array of the database

function validate(error, result, res){
	if(error){
		return res.status(500).send({messaga: 'Error in the server'});
	}
	if(!result || result.length === 0){ // 
		return res.status(404).send({messaga: 'Not Found'});
	}
	if(result){
		return res.status(200).send({audio: result});
	}
}

module.exports = validate;