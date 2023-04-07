import { Router } from 'express'
import { auth, registr, post } from '../controllers/apiAuth.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

//authorization
router.post('/auth', auth)
//registration
router.post('/registr', registr)
//GEt me
router.get('/posts', checkAuth, post)
export default router
