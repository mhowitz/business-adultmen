const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')
const User = require('./User')

const ProductSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    ownedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    photo: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      trim: true,
      maxLength: 280,
      minLength: 1,
      required: true
    },
    category: {
      type: String,
      trim: true,
      maxLength: 50,
      minLength: 1,
      required: true
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

ProductSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// ProductSchema.post("findOneAndDelete", document => {
//   const productId = document._id;
//   console.log(User);
//   User.find({ saves: { $in: [productId] } }).then(users => {
//     console.log(users);
//     Promise.all(
//       users.map(user =>
//         User.findOneAndUpdate(
//           user._id,
//           { $pull: { saves: productId } },
//           { new: true }
//         )
//       )
//     );
//   });
// });

const Product = model('Product', ProductSchema);

module.exports = Product;
