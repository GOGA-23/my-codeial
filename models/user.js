const mongoose = require('mongoose');
const multer =require('multer');
const path =require('path');
const AVATAR_PATH =path.join('/uploads/users/avatars');

// user data can be done
const userSchema = new mongoose.Schema({

  email:{
    type: String,
    required: true,
    unique: true
  },

  password:{
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
  
}, {

  timestamps:true
});

let storage = multer.diskStorage({
  destination:  (req, file, cb)=> {
    cb(null, path.join(__dirname, '..',AVATAR_PATH));
  },
  filename:  (req, file, cb)=> {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

// static methods
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User", userSchema);

// export User to index,js
module.exports = User;