'use strict'

//Controller of users

const User = require('../models/user.schema');

const userController = {

	//Function to testing
	test: function(req, res){
		return res.status(200).send({message:"The test functions work properly"});
	},

	//Function to register in database a new user
	singUp: function(req,res){
		let user = new User;
		const data = req.body
		user.nick = data.nick;
		user.email = data.email;
		user.password = data.password;
		user.name = data.name;
		user.lastname = data.lastname;
		user.typeUser = data.typeUser;



		User.findOne({'nick': user.nick, 'email': user.email}).exec((error, result) => {
			if(error){
				return res.status(500).send({message: 'An error has ocurred in the server'});
			}
			if(result){
				return res.status(501).send({messge: 'The nickname or the email has been already used'});
			}
			if(!result){
				user.save((error, saved) => {
					if(error){
						return res.status(500).send({message: 'An error has ocurred in the server when it try to save the user'});
					}
					if(!saved){
						return res.status(404).send({message: 'The user could not be found'});
					}
					if(saved){
						return res.status(200).send({message: 'The user has been saved succefully', user: saved})
					}
				});
			}
		});
	},

	SingIn: function(req, res){
		
	}
}

module.exports = userController;