const {User, Comment, Product } = require('../models');

const commentController= {
    getComments : async function(req, res){
        try {
            const commentData = await Comment.find({})
                //  .populate('product')
            .select("-__v")
            .sort("createdAt")
       
            console.log(commentData);
            res.json(commentData)
        } catch (error){
            res.status(500).json(error)
        }
    } ,
    addComment: async function ({ params, body }, res) {
        console.log(body);
        try{
            const commentData = await Comment.create({
                 userId: params.userId,
                 productId: params.productId,
                 commentBody: body.commentBody
            })
            console.log(commentData)
            const productData = await Product.findOneAndUpdate(
              { _id: params.productId },
              { $push: { comments: commentData._id } },
              { new: true }
            ).populate('Product')
            console.log(productData);

          if (!commentData || !productData) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
          }
          res.json(productData);
        }
       
          catch (error){
            res.status(500).json(error)
          }
      },
      addReply: async function ({ params, body}, res) {
          console.log(body);
          try {
              const replyData = await Comment.findOneAndUpdate(
                  {_id: params.commentId,
                },
                  { $push: { replies: body, userId: params.userId }},
                  {new: true, runValidators: true}
              )
              if(!replyData) {
                  res.status(404).json({ message: "no comment with this id"})
              }
              res.json(replyData)
          } catch(error) {
              res.status(500).json(error)
          }
      },
      removeComment: async function ({ params }, res) {
          try {
              const commentData = await Comment.findOneAndDelete({_id: params.commentId})
                if(!commentData) {
                    res.status(404).json({ message: "no comment with this id"})
                }
                const productData = await Product.findOneAndUpdate(
                    {_id: params.productId},
                    { $pull: { comments: params.commentId}},
                    {new: true}
                )
                if(!productData) {
                    res.status(404).json({ message: "no product with this id"})
                }
                res.json(productData)
          } catch (error ) {
              res.status(500).json(error)
          }
      }
}

module.exports= commentController;