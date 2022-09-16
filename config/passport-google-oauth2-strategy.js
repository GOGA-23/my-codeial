const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({
  clientID: "1049293822626-rff063s0gq42pkcg2l543slqakv5not2.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:8000/user/auth/google/callback"

},
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ email: profile.emails[0].value }).exec((err, user) => {
      if (err) {
        console.log('error in google strategy-passport', err);
        return;
      }
      console.log(accessToken, refreshToken);
      console.log(profile);
      if(user){
        return done(null,user);
      } else{
        User.create({
          name : profile.displayName,
          email : profile.emails[0].value,
          password : crypto.randomBytes(20).toString('hex')
        }, (err,user)=>{
          if(err){console.log('error in creating user google strategy-passport', err);
          return;}
          return done(null,user);
        });
      }
    });
  }
));
