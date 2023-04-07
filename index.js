import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

//Import Routes
import post from './routes/post.routes.js'
import user from './routes/auth.routes.js'

dotenv.config()
const server = express()

//Middleware
server.use(cors())
server.use(express.json({ extended: true }))
//Routes
server.use('/api/post', post)
server.use('/', user)

//constants
const PORT = process.env.PORT || 3001
const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_USER = process.env.DB_USER

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.j4neggz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    server.listen(PORT, () => console.log(`Server runing on the ${PORT} port`))
  } catch (error) {
    console.log(error)
  }
}
start()
