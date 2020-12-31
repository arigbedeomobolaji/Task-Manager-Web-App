const express = require("express")
const router = express.Router()
const { createTask, createNewTask, searchTask, query } = require("../controller/task.controller")

const { verifyAccessToken } = require("../helpers/authtoken")

router.get("/create", verifyAccessToken, createTask)
router.post("/create", verifyAccessToken, createNewTask)
router.post("/search", verifyAccessToken, searchTask)
router.get("/query", verifyAccessToken, query)

module.exports = router;
