const multer = require("multer")
const upload = multer({
 dest: "tmp/uploads/avatar",
 limits: {
  fileSize: 100000
 },

 fileFilter(req, file, cb) {
  console.log(file.originalname)
  console.log(file.size)

  if (!file.originalname.match(/\.(jp[e]*g|png)$/g)) cb(new Error("Please upload a picture format"))
  
  cb(undefined, true)
 }
})

module.exports = upload
