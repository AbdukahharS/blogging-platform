import { Schema, model, models } from 'mongoose'

const CommentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author is required!'],
    },
    body: {
      type: String,
      required: [true, 'Title is required!'],
    },
    target: {
      type: Schema.Types.ObjectId,
      required: [true, 'Target is required!'],
    },
  },
  {
    timestamps: true,
  }
)

const Comment = models.Comment || model('Comment', CommentSchema)

export default Comment
