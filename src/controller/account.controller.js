const createError = require("http-errors")
const User = require("../model/user.model")
const { authUserSchema } = require("../helpers/authschema")
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require("../helpers/authtoken")

module.exports = {
  // Rendering the Register route
  register: async (req, res, next) => {
    try {
      res.render("signup")
    } catch (e) {
      next(e)
    }
  },

  //Getting the 
  registerNewUser: async (req, res, next) => {
    try {
      const result = await authUserSchema.validateAsync(req.body);

      const userExist = await User.findOne({ email: result.email })

      if (userExist) throw createError.BadRequest(`${result.email} already exist`)
      
      const user = new User(result)
      const savedUser = await user.save()
      if (!savedUser) throw createError.BadRequest()
      const accessToken = await signAccessToken(savedUser.email)
      res.cookie("accessToken", accessToken, {httpOnly: true})
      res.redirect(`/profile/${user.username}`)
    } catch (e) {
      if (e.status === 400 || e.isJoi) {
        console.log(e.message)
        return res.redirect("/account/register")
      }
      next(e)
    }
  },

  login: async (req, res, next) => {
    try {
      res.render("login")
    } catch (e) {
      next(e)
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      if (!user) throw createError.BadRequest()

      const accessToken = await signAccessToken(user.email)

      res.cookie("accessToken", accessToken, {httpOnly: true})
      res.redirect(`/profile/${user.username}`)

    } catch (e) {
      if (e.status === 400 || e.message ==="Please Authenticate") {
        console.log(e.message)
        return res.redirect("/account/login")
      }
      next(e)
    }
  },

  logoutUser: async (req, res, next) => {
    try {
      res.cookie("accessToken", "", { httpOnly: true })
      
      res.redirect(`/account/login`)
    } catch (e) {
      next(e)
    }
  }
}