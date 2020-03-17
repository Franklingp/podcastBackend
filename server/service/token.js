'use strict'

//This algorithm is to encode and decode a token of the authentication

const jwt = require("jwt-simple");
const moment = require("moment");
const secret = "SecretKey";

const token = {

	encode: function(data){
		//data paramether is the id of the user
		let payloads = {
			sub: data,
			iat:moment().calendar(),
			exp: moment().add(14, "days").calendar()
		};

		const tk = jwt.encode(payloads, secret);
		return tk;
	},

	decode: function(data){
		//data is the token of the user
		try{
			const tk = jwt.decode(data, secret);
			return tk;
		}
		catch(error){
			console.log(error);
			return false;
		}
		

	}

}

module.exports = token;