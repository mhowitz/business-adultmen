const { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  { signToken, authMiddleware }  = require('../utils/auth');


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
			const user = await User.findOne({ email: req.body.email })
			if(!user || !user.isCorrectPassword(req.body.password)) {
					return res.status(401).json({ message: 'Authentication failed, Invalid user or password!'});
				}

				// let token = jwt.sign({ email: userData.email,  _id: userData._id }, 'mysecretsshhhhh', { expiresIn: '2h'});
				// req.headers.token = token;
				const token = signToken(user);
				console.log(token, user);
				res.json({token, user})
				return {token, user};
			
		}
		catch (error) {
			res.status(500).json(error)
		}
	}, 
	userLogout: async function (req, res) {
		console.log(req.header('Authorization'));
		try {
			if (req.header('Authorization')) {
			
				const token = req.header('Authorization');
				jwt.sign(token, ' ', { expiresIn: 1 }, (logout, err) => {
					if(logout) {
						res.json({ message: 'You have been logged out'})
					} else {
						res.json({ message: "error"})
					}
				})
				// res.status(200).json({message: "successfully logged out"})
				// .then(userToken => {
				// 	console.log(userToken)
				// 	res.status(200).json({message: "successfully logged out"})
				// })
				
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
  },
	getOwnedProducts: async function (req, res) {
		try {
			const userData = await User.findById(req.params.id)
				.populate("ownedProducts");
			console.log(userData);
			res.json(userData);
		} catch (error) {
			res.status(500).json(error)
		}
	}

}

module.exports = userController;