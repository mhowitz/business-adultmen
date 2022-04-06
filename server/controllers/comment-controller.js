const { User, Comment, Product } = require("../models");

const commentController = {
  getComments: async function (req, res) {
    try {
      const commentData = await Comment.find({})
        //  .populate('product')
        .select("-__v")
        .sort("createdAt");

      res.json(commentData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addComment: async function ({ params, body }, res) {
    try {
      const commentData = await Comment.create({
        userId: body.userId,
        commentBody: body.commentBody,
      });
      const productData = await Product.findOneAndUpdate(
        { _id: params.productId },
        { $push: { comments: commentData } },
        { new: true }
      );

      if (!productData) {
        res.status(404).json({ message: "No user with this id!" });
        return;
      }
      res.json(productData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addReply: async function ({ params, body }, res) {
    try {
      const replyData = await Comment.findOneAndUpdate(
        { _id: params.commentId },
        { $push: { replies: body } },
        { new: true, runValidators: true }
      );
      if (!replyData) {
        res.status(404).json({ message: "no comment with this id" });
      }
      res.json(replyData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  removeComment: async function ({ params }, res) {
    try {
      const commentData = await Comment.findOneAndDelete({
        _id: params.commentId,
      });
      if (!commentData) {
        res.status(404).json({ message: "no comment with this id" });
      }
      const productData = await Product.findOneAndUpdate(
        { _id: params.productId },
        { $pull: { comments: params.commentId } },
        { new: true }
      );
      if (!productData) {
        res.status(404).json({ message: "no product with this id" });
      }
      res.json(productData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  removeReply: async function ({ params }, res) {
    try {
      const replyData = await Comment.findOneAndUpdate(
        { _id: params.commentId },
        { $pull: { replies: { replyId: params.replyId } } },
        { new: true }
      );
      if (!replyData) {
        res.status(404).json({ message: "no comment found with this id" });
      }
      res.json(replyData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = commentController;
