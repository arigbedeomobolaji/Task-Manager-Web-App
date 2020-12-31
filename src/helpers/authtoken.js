const jwt = require("jsonwebtoken")
const createError = require("http-errors")

const signAccessToken = async (email) => {
 return new Promise((resolve, reject) => {
  const payload = {}
  const secret = process.env.ACCESS_SECRET_KEY
  const options = {
   audience: email,
   issuer: 'Arigbede Omobolaji',
   expiresIn: '30d',
  }

  jwt.sign(payload, secret, options, (error, token) => {
   if (error) {
    console.log(error.message)
    reject(createError.InternalServerError())
   }
   resolve(token)
  })
 })
}

const signRefreshToken = async (email) => {
 return new Promise((resolve, reject) => {
  const payload = {}
  const secret = process.env.REFRESH_SECRET_KEY
  const options = {
   audience: email,
   expiresIn: "10h",
   issuer: "Arigbede Omobolaji"
  }

  jwt.sign(payload, secret, options, (error, token) => {
   if (error) {
    console.log(error.message)
    reject(createError.InternalServerError())
   }
   resolve(token)
  })
 })
}

const verifyAccessToken = (req, res, next) => {
 try {
  const token = req.cookies.accessToken

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, async (err, decoded) => {
   if (err) {
    const message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.message

    if(message === "jwt expired") res.redirect("/account/login")
    throw next(createError.Unauthorized(message))
   }

   const User = require("../model/user.model")
   const user = await User.findOne({ email: decoded.aud })
   if (!user || user === null) throw next(createError.Unauthorized())

   if(decoded.aud !== user.email) throw next(createError.Unauthorized())
   req.user = user;
   next()
  })
 } catch (e) {
  next(e)
 }
}

const verifyRefreshToken = (token) => {
 return new Promise((resolve, reject) => {
  jwt.verify(token, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
   if (err) {
    const message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.message
    console.log({message})
    reject(next(createError.Unauthorized(message)))
   }
   const email = decoded.aud
   resolve(email)
  })
 })
}

module.exports = {
 signAccessToken,
 signRefreshToken,
 verifyAccessToken,
 verifyRefreshToken
}