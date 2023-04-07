import JWT from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET)
      req.userId = decoded.userId
      next()
    } catch (error) {
      return res.json({
        message: 'No access',
      })
    }
  } else {
    return res.json({
      message: 'No access',
    })
  }
}
