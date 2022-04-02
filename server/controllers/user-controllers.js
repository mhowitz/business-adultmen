const { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  { signToken }  = require('../utils/auth');
const userController = {
  getUsers: async function(req, res) {
    try {
			const userData = await User.find({})
			console.log(userData);
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
			}, function(err, user){
				if( err) throw err;
				if(!user || !user.isCorrectPassword(req.body.password)) {
					return res.status(401).json({ message: 'Authentication failed, Invalid user or password!'});
				}
				return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'mysecretsshhhhh', { expiresIn: '2h'}) });
			
			})
		}
		catch (error) {
			res.status(500).json(err)
		}
	}, 
	userLogout: async function (req, res, context) {
		try {
			if(!context.user) {
				res.status(404).json({ message: "not logged in"})
			}
			const userData = await User.findOne({
				token: context.user.token
			})
			res.status(200).json({message: "successfully logged out"})
			return jwt.destroy({ userData })

		} catch (error) {
			res.status(500).json(err)
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
  },
	getOwnedProducts: async function (req, res) {
		try {
			const userData = await User.findById(req.params.id)
				.populate("ownedProducts");
			console.log(userData);
			res.json(userData.ownedProducts);
		} catch (error) {
			res.status(500).json(error)
		}
	}

}

module.exports = userController;