import User from '../models/User.js'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

//Authorization user
export const auth = async (req, res) => {
  try {
    const { username, password } = req.body
    const isUsedUserName = await User.findOne({ username })

    if (!isUsedUserName) {
      return res.json({
        message: 'Invalid username',
      })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUsedUserName.password
    )
    if (!isPasswordCorrect) {
      return res.json({
        message: 'Invalid password',
      })
    }

    const token = JWT.sign(
      {
        id: isUsedUserName._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.json({
      token,
      isUsedUserName,
      message: 'You are logged in',
    })
  } catch (error) {
    res.json({
      message: 'Authorization error',
    })
  }
}
//Registration
export const registr = async (req, res) => {
  try {
    const { username, password, email } = req.body
    const isUsedEmail = await User.findOne({ email })
    const isUsedUserName = await User.findOne({ username })

    if (isUsedUserName) {
      return res.json({
        message: 'This username is already in the database',
      })
    }

    if (isUsedEmail) {
      return res.json({
        message: 'This email is already in the database',
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new User({
      username,
      email,
      password: hash,
    })

    await newUser.save()

    res.json({
      newUser,
      message: 'Registration complited',
    })
  } catch (error) {
    res.json({
      message: 'Error creating user',
    })
  }
}
//Post
export const post = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.json({
        message: 'This username is already in the database',
      })
    }

    const token = JWT.sign(
      {
        id: isUsedUserName._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.json({
      user,
      token,
    })
  } catch (error) {
    return res.json({
      message: 'No access',
    })
  }
}
