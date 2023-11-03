import { Schema, model, models } from 'mongoose'

const CategorySchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: [true, 'Author is required!'],
  },
  title: {
    type: String,
    required: [true, 'Title is required!'],
  },
})

const Category = models.Category || model('Category', CategorySchema)

export default Category
