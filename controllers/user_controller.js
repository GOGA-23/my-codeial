const User = require("../models/user");

module.exports.profile = function(req, res){
   return res.render('user' , {
      title : "User Profile"
    });
}

module.exports.sign_up = function(req , res){
   return res.render('user_sign_up',{
      title: "Sign-Up Page"

   });
 }

 module.exports.sign_in = function(req , res){
   return res.render('user_sign_in',{
      title: "Sign-IN Page"

   });
 }

//  get the sign up data
 module.exports.create = function(req,res){

   if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
   }


   User.findOne({email: req.body.email}, function(err,user){

      if(err){
         console.log("Error in finding user in signing up");
         return;
      }

      if(!user){
         User.create(req.body, function(err,user){
            if(err){
               console.log("Error in creating  user while signing up");
               return;
            }
            return res.redirect('/user/signIn');
         })
         
      }else{
         return res.redirect('back');
      }
   });
 }

// get sign in and create a session for data 
 module.exports.createSession = function(req,res){
   // added
}