import { Schema, model, models } from 'mongoose'

const PostSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author is required!'],
    },
    title: {
      type: String,
      required: [true, 'Title is required!'],
    },
    body: {
      type: String,
      required: [true, 'Body is required!'],
    },
    categories: {
      type: [Schema.Types.ObjectId],
      required: [true, 'At least 1 category required'],
    },
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['public', 'hidden', 'draft', 'scheduled'],
      required: [true, 'Status required'],
    },
    scheduledDate: {
      type: Date,
      required: function () {
        return this.status === 'scheduled'
      },
    },
    seo: {
      type: Boolean,
      required: true,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
)

const Post = models.Post || model('Post', PostSchema)

export default Post
