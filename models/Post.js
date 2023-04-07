import { Schema, model } from 'mongoose'

const schema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  imgUrl: { type: String, required: true },
})

export default model('Post', schema)
