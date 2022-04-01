const { Product } = require("../models");

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
			const productData = await Product.create(req.body)
			res.json(productData)
		} catch (error) {
			res.status(500).json(error)
		}
	},
  getProduct: async function (req, res) {
		try {
			const productData = await Product.findById(req.params.productId)
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
  }
}

module.exports = productController;