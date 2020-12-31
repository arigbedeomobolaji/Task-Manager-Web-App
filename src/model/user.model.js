const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const { string } = require("joi")
const Schema = mongoose.Schema
const Task = require("./task.model")

const userSchema = new Schema({
 firstname: {
  type: String,
  required: true,
 },

 lastname: {
  type: String,
  required: true,
 },

 abbreviation: {
  type: String,
  uppercase: true,
  maxlength: 3
 },

 username: {
  type: String,
  lowercase: true,
  unique: true
 },

 email: {
  type: String,
  unique: true,
  required: true,
  lowercase: true
 },

 password: {
  type: String,
  required: true,
  minlength: 8,
  maxlength: 35,
  validate(value) {
   if (value.trim().includes("password")) {
    console.log(value)
    throw Error("password must not include password")
   }
  }
 },
 avatar: {
  type: Buffer
 }
}, {
 timestamps: true
});

//virtual method with are not stored in the database
userSchema.virtual("myTasks", {
 ref: "Task",
 localField: "email",
 foreignField: "owner.email"
})

userSchema.methods.toJSON = function() {
 const user = this;

 const userObject = user.toObject()

 delete userObject.password
 delete userObject.refreshTokens

 return userObject
}

userSchema.statics.findByCredentials = async ( id, password ) => {
 const user = id.trim().includes("@") ? await User.findOne({ email: id }) : await User.findOne({username: id});
 
 if(!user) throw Error("Please Authenticate")

 const isMatch = await bcrypt.compare(password, user.password)

 if(!isMatch) throw Error("Please Authenticate")

 return user

}

userSchema.pre("save", async function () {
 const user = this

 if (user.isModified()) {
  if (!user.username) {
   const username = user.email.split("@")[0]
   user.username = username
  }

  if (!user.abbreviation) {
  const abbreviate = user.lastname[0] + user.firstname[0]
   user.abbreviation = abbreviate
  }
   
  if(user.password.length < 35) {
   const hashedPassword = await bcrypt.hash(user.password, 10)
   user.password = hashedPassword
  }
 }
});

const User = mongoose.model("User", userSchema)

module.exports = User;