const { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  getUsers: async function(req, res) {
    try {
			const userData = await User.find({})
			res.json(userData)
		} catch (error) {
			res.status(500).json(error)
		}
  },
  createUser: async function (req, res) {
		try {
			const userData = await User.create(req.body)
			userData.password = bcrypt.hashSync(req.body.password, 10);
			res.json(userData)
		} catch (error) {
			res.status(500).json(error)
		}
	},
  getUser: async function (req, res) {
		try {
			const userData = await User.findById(req.params.userId)
			res.json(userData)
		} catch (error) {
			res.status(500).json(error)
		}
	},
	userLogin: async function (req, res){
		try {
			User.findOne({
				email: req.body.email
			}, function(err, user){
				if( err) throw err;
				if(!user || !user.isCorrectPassword(req.body.password)) {
					return res.status(401).json({ message: 'Authentication failed, Invalid user or password!'});
				}
				return res.json({ token: jwt.sign({ email: user.email, password: user.password, _id: user._id },' REsfulapis' )});
				
			})
		}
		catch (error) {
			res.status(500).json(err)
		}
	}
}

module.exports = userController;