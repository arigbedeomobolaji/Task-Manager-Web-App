const express = require("express")
const router = express.Router()
const upload = require("../helpers/upload")
const { getProfile, editProfile, uploadProfilePics } = require("../controller/profile.controller")
const { verifyAccessToken } = require("../helpers/authtoken")

router.get("/edit-profile", verifyAccessToken, editProfile)
router.get("/:username", verifyAccessToken, getProfile)
router.post("/uploads", verifyAccessToken, upload.single("avatar"), uploadProfilePics)

module.exports = router