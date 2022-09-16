const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

router.use('/api', require('./api'));

module.exports = router;

// for any further routes, access fro here
// syntax router.use ('/routerName' , require ("./routerFile"));