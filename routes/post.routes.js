import { Router } from 'express'
import Post from '../models/Post.js'

const router = new Router()

router.post('/add', async (req, res) => {
  const { title, text, imgUrl } = req.body
  const post = new Post({
    title,
    text,
    imgUrl,
  })
  await post.save()
  res.json(post)
})

export default router
