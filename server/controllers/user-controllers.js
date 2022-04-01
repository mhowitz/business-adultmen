const { User } = require("../models");

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
			res.json(userData)
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