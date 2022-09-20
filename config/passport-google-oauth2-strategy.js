const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('../config/environment');

passport.use(new googleStrategy({
  clientID: env.google_client_id,
  clientSecret: env.google_client_secret,
  callbackURL: env.google_call_back_url

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
