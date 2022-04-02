const { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  { signToken }  = require('../utils/auth');
const { json } = require("express");


const userController = {
  getUsers: async function(req, res) {
    try {
			const userData = await User.find({})
			res.json(userData);

		} catch (error) {
			res.status(500).json(error)
		}
  },
  createUser: async function (req, res) {
		try {
			const userData = await User.create(req.body)
			userData.password = bcrypt.hashSync(req.body.password, 10);
			const token = signToken(userData);
			res.json(userData);
			return { token, userData };
		} catch (error) {
			res.status(500).json(error)
		}
	},
  getUser: async function (req, res) {
		try {
			const userData = await User.findById(req.params.id)
			res.json(userData)
		} catch (error) {
			res.status(500).json(error)
		}
	},
	userLogin: async function (req, res){
		try {
			User.findOne({
				email: req.body.email
			}).then(userData => {
				if(!userData || !userData.isCorrectPassword(req.body.password)) {
					return res.status(401).json({ message: 'Authentication failed, Invalid user or password!'});
				}

				let token = jwt.sign({ email: userData.email,  _id: userData._id }, 'mysecretsshhhhh', { expiresIn: '2h'});
				req.headers.token = token;

				console.log(req.headers);
				req.user = user;
				res.json(userData);
			})
		}
		catch (error) {
			res.status(500).json(err)
		}
	}, 
	userLogout: async function (req, res, next) {
		console.log(req.headers)
		try {
			if (req.headers.token) {
				token = token
				  .split(' ')
				  .pop()
				  .trim();
				await User.findByToken(token, (req, res) => {
					
				}).then(userToken => {
					console.log(userToken)
					res.status(200).json({message: "successfully logged out"})
				})
				
			  }else {
				  res.status(400).json({ message: 'not logged in'})
			  }
			// if(!token) {
			// 	res.status(404).json({ message: "not logged in"})
			// }
	
			
			// return jwt.destroy({ userData })

		} catch (error) {
			res.status(500).json(error)
		}
	},
  saveProduct: async function (req, res) {
    try {
      const userData = await User.findByIdAndUpdate(req.params.id, {$addToSet: {saves: req.body.productId}})
      res.json(userData);
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getSavedProducts: async function (req, res) {
    try {
      const productData = await User.findById(req.params.id)
        .populate("saves");
      res.json(productData.saves);
    } catch (error) {
      res.status(500).json(error)
    }
  }

}

module.exports = userController;