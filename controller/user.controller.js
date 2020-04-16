'use strict'

//Controller of users

const User = require('../models/user.schema');
const bcrypt = require('bcrypt-nodejs');
const token = require('../service/token');

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

	//Function to return a token and loggin an user
	loggIn: function(req, res){
		let user = {
			primaryKey: req.body.primaryKey,
			password: req.body.password
		};

		if(user.primaryKey.indexOf("@") == -1){
			User.findOne({"nick": user.primaryKey}).exec((error,result)=>{
				if(error){
					return res.status(500).send({message: "An error has ocurred in the server"});
				}
				if(!result){
					return res.status(404).send({message: "The user could not be found"});
				}
				if(result){
					const pass = bcrypt.compareSync(user.password, result.password);
					if(pass){
						const tk = token.encode(result._id);
						return res.status(200).send({message:"success", token: tk});
					}else{
						return res.status(301).send({message:"failed"});
					}
				}
			});
		}else{
			User.findOne({'email': user.primaryKey}).exec((error,result)=>{
				if(error){
					return res.status(500).send({message: "An error has ocurred in the server"});
				}
				if(!result){
					return res.status(404).send({message: "The user could not be found"});
				}
				if(result){
					const pass = bcrypt.compareSync(user.password, result.password);
					if(pass){
						const tk = token.encode(result._id);
						return res.status(200).send({message:"success", token: tk});
					}else{
						return res.status(301).send({message:"failed"});
					}
				}
			});
		}
	},

	//Function to update the data of an user
	update: function(req, res){
		let user = JSON.parse(JSON.stringify(req.body));
		const id = req.params.id;

		User.findByIdAndUpdate(id, user, {new: true, useFindAndModify:false}).exec((error, result) => {
			if(error){
				return res.status(500).send({message: "Has been failed"});
			}
			if(!result){ 
				return res.status(404).send({message: "The user could not be found"});
			}
			return res.status(200).send({message: "success", data: result});
		});
	},

	//Function to delete an user in the database
	delete: function(req, res){
		let id = req.params.id;
		User.findByIdAndRemove(id, {useFindAndModify:false}).exec((error, result) => {
			if(error) return res.status(500).send({message: "An error has ocurred in the server"});
			if(!result) return res.status(404).send({message: "User not found"});
			return res.status(200).send({message: "The user was deleted"});
		});
	}
}

module.exports = userController;