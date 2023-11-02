import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    unique: [true, 'Username already exists!'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/,
      'Username is invalid, it should contain 8-20 non-capital alphanumeric letters and be unique!',
    ],
  },
  displayName: {
    type: String,
    required: [true, 'Display name is required!'],
  },
  website: {
    type: String,
    match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Website name is invalid!'],
  },
  about: {
    type: String,
    default: '',
  },
  allowComments: {
    type: Boolean,
    default: true,
  },
  allowReactions: {
    type: Boolean,
    default: true,
  },
  displayAuthorName: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
})

const User = models.User || model('User', UserSchema)

export default User
