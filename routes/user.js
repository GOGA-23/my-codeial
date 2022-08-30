const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controller');


router.get('/profile', passport.checkAuthentication,userController.profile);
router.get('/signUp', userController.sign_up);
router.get('/signIn', userController.sign_in);

router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
  'local',
  {failureRedirect: '/users/signIn'},
), userController.createSession);

router.get('/signOut', userController.destroySession);


module.exports = router;