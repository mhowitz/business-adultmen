const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const CommentSchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    body: {
      type: String,
      trim: true,
      maxLength: 280,
      minLength: 1
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
