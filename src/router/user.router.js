const express = require("express")
const router = express.Router()
const { register, registerNewUser, login, loginUser, logoutUser } = require("../controller/account.controller")
const { verifyAccessToken } = require("../helpers/authtoken")

router.get("/register", register)
router.post("/register", registerNewUser)
router.get("/login", login)
router.post("/login", loginUser)
router.get("/logout", verifyAccessToken, logoutUser)

module.exports = router;