const mongoose = require("mongoose")
const Schema = mongoose.Schema

const objectId = Schema.Types.ObjectId

const taskSchema = new Schema({
 description: {
  type: String,
  required: true,
  unique: true
 },

 completed: {
  type: Boolean,
 },

 owner: {

  id: {
   type: objectId,
   required: true,
   ref: "User"
  },

  email: {
   type: String,
   required: true,
   ref: "User"
  }
  
 }
})

taskSchema.methods.toJSON = function () {
 const task = this

 const taskObject = task.toObject()

 delete taskObject.owner
 delete taskObject._id

 return taskObject
}

const Task = mongoose.model("Task", taskSchema)

module.exports = Task