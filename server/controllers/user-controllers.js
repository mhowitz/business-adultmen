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
			const userData = await User.findById(req.params.userId)
			res.json(userData)
		} catch (error) {
			res.status(500).json(error)
		}
	}
}

module.exports = userController;