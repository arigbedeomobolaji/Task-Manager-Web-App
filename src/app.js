require("dotenv").config()
const express = require("express")
const path = require("path")
const createError = require("http-errors")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const hbs = require("hbs")
const app = express()
require("./helpers/init_database")

const viewsPath = path.join(__dirname, "../template/views")
const partialsPath = path.join(__dirname, "../template/partials")

const userRouter = require("./router/user.router")
const profileRouter = require("./router/profile.router")
const taskRouter = require("./router/task.router")

//config script
app.use(cookieParser())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

//config templating engine
app.set("view engine", "html")
app.engine("html", hbs.__express)
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.get("/", (req, res) => {
 res.render("index")
})

//Account Router
app.use("/account", userRouter)

//Profile Router
app.use("/profile", profileRouter)

// Task Route
app.use("/tasks", taskRouter)

//Handling Error
app.use((req, res, next) => {
 next(createError.NotFound())
})

app.use((err, req, res, next) => {
 res.status(err.status || 500)
 
 if (err.status === 401) {
  return res.redirect("/account/login")
 }

 if (err.status === 404) {
  return res.redirect("/")
 }

 res.send({
  status: err.status,
  message: err.message
 })
})

let port = process.env.port

app.listen(port, () => {
 console.log(`App is currenly listening on port: ${port}`)
})
