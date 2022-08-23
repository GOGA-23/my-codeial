const mongoose = require('mongoose');

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
  }
  
}, {

  timestamps:true
});

const User = mongoose.model("User", userSchema);

// export User to index,js
module.exports = User;