const createError = require("http-errors")
module.exports = {

 getProfile: async (req, res, next) => {
  try {
   if(req.user.username !== req.params.username) throw next(createError.Unauthorized())
   
   await req.user.populate("myTasks").execPopulate()
   const tasks = req.user.myTasks


   res.render("profile", {
    username: req.user.username,
    tasks

   })
  } catch (e) {
   next(e)
  }
 },

 editProfile: async (req, res, next) => {
  try {


   res.render("edit_profile", {
    username: req.user.username
   })
  } catch (e) {
   next(e)
  }
 },

 uploadProfilePics: async (req, res, next) => {
  try {

   res.redirect(`/profile/${req.user.username}`)

  } catch (e) {
   console.log(e.message)
   next(e)
  }
 }
}
