const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const ProductSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    photo: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      maxLength: 280,
      minLength: 1
    },
    price: {
      type: Double,
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
    comments: [CommentSchema]
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

// // set up pre-save middleware to create password
// userSchema.pre('save', async function(next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// // compare the incoming password with the hashed password
// userSchema.methods.isCorrectPassword = async function(password) {
//   return bcrypt.compare(password, this.password);
// };

// userSchema.virtual('friendCount').get(function() {
//   return this.friends.length;
// });

const Product = model('Product', ProductSchema);

module.exports = Product;
