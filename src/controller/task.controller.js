const Task = require("../model/task.model")
const {authTaskSchema} = require("../helpers/authschema")
const isEmpty = require("../utilities/isempty")

module.exports = {
 createTask: async (req, res, next) => {
  try {
   res.render("create_task")
  } catch (e) {
   next(e)
  }
 },
 
 createNewTask: async (req, res, next) => {
  try {
   const result = await authTaskSchema.validateAsync(req.body)

   const newTask = new Task({
    description: result.description,
    completed: result.completed,
    owner: {
     id: req.user._id,
     email: req.user.email
    }
   })

   const savedTask = await newTask.save()
   
   res.redirect(`/profile/${req.user.username}`)

  } catch (e) {
   if(e.isJoi) console.log("error is joi")
   next(e)
  }
 },

 searchTask: async (req, res, next) => {
 try {
  const search = req.body.search
  const task = await Task.findOne({description: search, "owner.email": req.user.email})
  if(!task) console.log("task doesn't exist")
  console.log(task)
  res.redirect(`/profile/${req.user.username}`)
 } catch (e) {
  next(e)  
  }
 },

 query: async (req, res, next) => {
  try {
   if (isEmpty(req.query)) {
    return res.send("Search related task using (:) delimiter fields are description,completed, sortBy, limit")
   }

   const completed = req.query.completed
   const description = req.query.description
   const sort = req.query.sort
   const sortKey = sort.split(":")[0]
   const sortValue = sort.split(":")[1] === "asc"? "asc": "desc"
   const sortBy = {}
   const match = {}
   
   if (sort) sortBy[sortKey] = sortValue

   if (completed) match.completed = completed === 'true'

   if(description) match.description = description

   console.log(sortBy)

   const options = {
    path: "myTasks",
    match,
    options: {
     limit: parseInt(req.query.limit),
     skip: parseInt(req.query.skip),
     sort: sortBy
    }
   }
   await req.user.populate(options).execPopulate()
   const yourTasks = req.user.myTasks
   res.send({yourTasks})
  } catch (e) {
   next(e)
  }
 }
}