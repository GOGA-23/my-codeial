const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('../config/environment');

const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret_key
}

passport.use(new JWTStrategy(opts, function(jwt_payload, done){

    User.findById(jwt_payload._id, (err,user)=>{
        if (err){
          console.log('Error in finding user from JWT');
          return;
        }
        if(user){
          return done(null,user);
        } else{
          return done(null,user);
        }
    });

}));

module.exports = passport;