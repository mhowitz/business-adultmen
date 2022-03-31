const { Product } = require("../models");

const productController = {
  getProducts: async function(req, res) {
    try {
			const productData = 
        await Product.find({})
          .select("-__v")
          .sort({ createdAt: -1})

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
	}
}

module.exports = productController;