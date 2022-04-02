const { Product, User } = require("../models");
const authMiddleware = require('../utils/auth');
const productController = {
  getProducts: async function(req, res) {
    try {
			const productData = 
        await Product.find({})
          .select("-__v")
          .sort("-createdAt")

			res.json(productData)
		} catch (error) {
			res.status(500).json(error)
		}
  },
  createProduct: async function (req, res) {
		try {

      		console.log(req.user);
			const productData = await Product.create(req.body)
			const userData = await User.findByIdAndUpdate(
				{_id: req.user._id},
				 {$push: {ownedProducts: productData}});
			res.json(productData)
		} catch (error) {
			res.status(500).json(error)
		}
	},
  getProduct: async function (req, res) {
		try {
			const productData = await Product.findById(req.params.id)
			res.json(productData)
		} catch (error) {
			res.status(500).json(error)
		}
	},
  getProductsByCat: async function(req, res) {
    try {
			const productData = 
        await Product.find({category: req.params.name})
          .select("-__v")
          .sort("-createdAt")

			res.json(productData)
		} catch (error) {
			res.status(500).json(error)
		}
  },
  getProductsByCatAndPrice: async function(req, res) {
    try {
      const direction = (req.params.direction).toString();
			const productData = 
        await Product.find({category: req.params.name})
          .select("-__v")
          .sort({ price: direction})

			res.json(productData)
		} catch (error) {
			res.status(500).json(error)
		}
  },
	deleteProduct: async function(req, res) {
		try {
			const productData = await Product.findByIdAndDelete({_id: req.params.id});

			const usersData =
				await User.find({ saves: { $in: [req.params.id] }}).then(users => {
					Promise.all(
						users.map(user =>
							User.findOneAndUpdate(
								user._id,
								{ $pull: { saves: req.params.id } },
								{ new: true }
							)
						)
					);
				});

			res.json(productData);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	unSaveProduct: async function(req, res) {
		try {
			const productData = await User.findByIdAndUpdate({_id: req.params.id}, 
				{$pull: 
					{saves: req.body.productId}
				});
			res.json(productData);

		} catch(error) {
			res.status(500).json(error);
		}
	}
}

module.exports = productController;