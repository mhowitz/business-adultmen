const { User, Product } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signToken, authMiddleware } = require("../utils/auth");

const userController = {
  getUsers: async function (req, res) {
    try {
      const userData = await User.find({})
        .populate("ownedProducts")
        .populate("saves");
      res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  createUser: async function (req, res) {
    try {
      const user = await User.create(req.body);
      user.password = bcrypt.hashSync(req.body.password, 10);
      const token = signToken(user);
      return res.json({ status: "ok", user: token });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUser: async function (req, res) {
    try {
      const userData = await User.findById(req.params.id);
      res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  userLogin: async function (req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(401)
          .json({
            message: "Authentication failed, Invalid user or password!",
          });
      }
      const correctPw = await user.isCorrectPassword(req.body.password);
      if (!correctPw) {
        return res
          .status(401)
          .json({ message: "Authentication failed, Invalid user or password" });
      }
      const token = signToken(user);
      // const userToken = await User.findOneAndUpdate({_id: user._id}, {$addToSet:{token: token}})
      return res.json({ status: "ok", user: token });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  userLogout: async function (req, res) {
    try {
      if (req.header("Authorization")) {
        const token = req.header("Authorization");
        jwt.sign(token, " ", { expiresIn: 1 }, (logout, err) => {
          if (logout) {
            res.json({ message: "You have been logged out" });
          } else {
            res.json({ message: "error" });
          }
        });
        // res.status(200).json({message: "successfully logged out"})
        // .then(userToken => {
        // 	console.log(userToken)
        // 	res.status(200).json({message: "successfully logged out"})
        // })
      } else {
        res.status(400).json({ message: "not logged in" });
      }
      // if(!token) {
      // 	res.status(404).json({ message: "not logged in"})
      // }

      // return jwt.destroy({ userData })
    } catch (error) {
      res.status(500).json(error);
    }
  },
  saveProduct: async function (req, res) {
    try {
      const userData = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { saves: req.body.productId } },
        { new: true }
      ).populate({
        path: "saves",
        populate: [
          // {
          // 	path: 'replies',
          // 	model: "Comment"
          // },
          {
            path: "productId",
            model: "Product",
          },
        ],
      });

      res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getSavedProducts: async function (req, res) {
    try {
      const productData = await User.findById(req.params.userId).populate(
        "saves"
      );
      // path: 'saves',
      // populate: [
      // {
      // 	path: 'productId',
      // 	model: 'Product'

      // }]})
      res.json(productData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOwnedProducts: async function (req, res) {
    try {
      const userData = await User.findById(req.params.id).populate(
        "ownedProducts"
      );
      res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
