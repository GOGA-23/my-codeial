const User = require("../models/user");
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {
   User.findById(req.params.id, (err, user) => {
      return res.render('user_profile', {
         title: "User Profile",
         profile_user: user
      });
   });
}

// module.exports.update = async (req,res)=>{
//    // if(req.user.id == req.params.id){
//    //    User.findByIdAndUpdate(req.params.id, req.body, (err,user)=>{
//    //       req.flash('success', 'Updated!');
//    //       return res.redirect('back');
//    //    });
//    // } else{
//    //    req.flash('error', 'Unauthorized!');
//    //    return res.status(401).send('Unauthorized');
//    // }

//    if(req.user.id == req.params.id){
//       try {
//          let user = await User.findById(req.params.id);
//          User.uploadedAvatar(req,res,(err)=>{
//             if(err){console.log('***Multer Error : ', err);}
            
//             user.name = req.body.name;
//             user.email = req.body.email;
//                if(req.file){
//                   user.avatar = User.avatarPath + '/' + req.file.filename;
//                   return;
//                }
//                user.save();
//                return res.redirect('back');

//          });
//       } catch (error) {
//          req.flash('error', error);
//          return res.redirect('back');
//       }
//    }   else{
//          req.flash('error', 'Unauthorized!');
//          return res.status(401).send('Unauthorized');
//       }

// }

module.exports.update = async function(req,res){
   // if(req.user.id == req.params.id){
   //     User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
   //         return res.redirect('back')
   //     })
   // }else{
   //     return res.status(401).send('Unauthorized');
   // }

   if(req.user.id == req.params.id){
       try{
           let user = await User.findById(req.params.id);
           User.uploadedAvatar(req,res,function(err){
               if(err){
                   console.log('****Multer Error : ',err);
               }
               user.name = req.body.name;
               user.email = req.body.email;
               //log(user.avatar); // it will give the current avatar id 

               if (req.file){

                   if(user.avatar){
                       fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                   }

                   // this is saving the path of uploaded file into the avatar field in the user 
                   user.avatar = User.avatarPath + '/' + req.file.filename;
                   //console.log(User.avatarPath + '/' + req.file.filename); it will give the new (updated) avatar id
               }
               user.save();
               return res.redirect('back');
           });
       }catch(err){
           req.flash('error',err);
           return res.redirect('back')
       }
   }else{
       req.flash('error','Unauthorized!');
       return res.status(401).send('Unauthorized');
   }
}

// render the sign up page
module.exports.sign_up = function (req, res) {

   if (req.isAuthenticated()) {
      return res.redirect('/user/profile')
   }

   return res.render('user_sign_up', {
      title: "Sign-Up Page"

   });
}

// render the sign up page
module.exports.sign_in = function (req, res) {

   if (req.isAuthenticated()) {
      return res.redirect('/user/profile')
   }

   return res.render('user_sign_in', {
      title: "Sign-IN Page"

   });
}

//  get the sign up data
module.exports.create = function (req, res) {

   if (req.body.password != req.body.confirm_password) {
      req.flash('error', 'Password does not match');
      return res.redirect('back');
   }


   User.findOne({ email: req.body.email }, function (err, user) {

      if (err) {
         req.flash('error', err);
         return;
      }
 
      if (!user) {
         User.create(req.body, function (err, user) {
            if (err) {
               req.flash('error', err);
                return;
            }
            return res.redirect('/user/signIn');
         })

      } else {
         req.flash('success', 'You have signed up, login to continue!');
         return res.redirect('back');
      }
   });
}

module.exports.createSession = function (req, res) {
   req.flash('success', 'Logged In Successfully');
   return res.redirect('/');
}


module.exports.destroySession = function (req, res, next) {
   req.logout(function (err) {
      if (err) { return next(err); }
      req.flash('success', 'You Have Logged Out')
      return res.redirect('/');
   });
   
}