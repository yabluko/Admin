const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const logerLimiter = require('../middleware/loginLimiter')

router.route('/')
    .post(logerLimiter, authController.login)

router.route('/refresh')
    .post(authController.refresh)

router.route('/logout')
    .post(authController.logout)


module.exports = router;