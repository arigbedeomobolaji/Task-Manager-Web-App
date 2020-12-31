const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017", {
 dbName: "Task_Manager",
 useCreateIndex: true,
 useUnifiedTopology: true,
 useNewUrlParser: true,
 useFindAndModify: false
}, () => {
  console.log("MongoDB is connected to the server")
})

mongoose.connection.on("connected", () => {
 console.log("Mongoose is connected to the database")
})

mongoose.connection.on("error", (error) => {
 console.log(error.message)
})

mongoose.connection.on("disconnected", () => {
 console.log("Monodb is successfully disconnected from the database")
})

process.on("SIGINT", async () => {
 await mongoose.connection.close()
 process.exit(0)
})