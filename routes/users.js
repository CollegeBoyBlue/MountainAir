const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utilities/catchAsync');
const Users = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
    .get(users.registrationForm)
    .post(catchAsync(users.registerUser));

router.route('/login')
    .get(users.loginPage)
    .post(passport.authenticate('local', {
        failureFlash: true, failureRedirect:'/login'}), users.login);

router.get('/logout', users.logout);

module.exports = router; 