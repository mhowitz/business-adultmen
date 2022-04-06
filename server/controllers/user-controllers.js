const { User, Product } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  { signToken, authMiddleware }  = require('../utils/auth');


const userController = {
  getUsers: async function(req, res) {
    try {
			const userData = await User.find({})
			.populate("ownedProducts")
			.populate("saves");
			res.json(userData);

		} catch (error) {
			res.status(500).json(error)
		}
  },
  createUser: async function (req, res) {
		try {
			const user = await User.create(req.body)
			user.password = bcrypt.hashSync(req.body.password, 10);
			const token = signToken(user);
			return res.json({status: 'ok', user: token})
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
			const user = await User.findOne({ email: req.body.email })
			if(!user) {
					console.log('no user found')
					return res.status(401).json({ message: 'Authentication failed, Invalid user or password!'});
				}
				const correctPw = await user.isCorrectPassword(req.body.password);
				if(!correctPw) {
					console.log('incorrect passwrod')
					return res.status(401).json({ message: 'Authentication failed, Invalid user or password' });
				}
				const token = signToken(user);
				return res.json({ status: 'ok', user: token })
		}
		catch (error) {
			res.status(500).json(error)
		}
	}, 
  saveProduct: async function (req, res) {
    try {
      const userData = await User.findByIdAndUpdate(
		  req.params.userId,
		  {$addToSet: {saves: req.body.productId}},
		   {new: true})
		   .populate({
			path: 'saves',
			populate: [
			{
				path: 'productId',
				model: 'Product'

			}]
		})
		
      res.json(userData);
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getSavedProducts: async function (req, res) {
    try {
      const productData = await User.findById(req.params.userId)
	  .populate('saves')
		res.json(productData)
    } catch (error) {
      res.status(500).json(error)
    }
  },
	getOwnedProducts: async function (req, res) {
		try {
			const userData = await User.findById(req.params.id)
				.populate("ownedProducts");
			res.json(userData);
		} catch (error) {
			res.status(500).json(error)
		}
	}

}

module.exports = userController;