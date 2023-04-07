import { Schema, model } from 'mongoose'
import Post from '../models/Post.js'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: Post,
      },
    ],
  },
  { timestamps: true }
)

export default model('User', userSchema)
