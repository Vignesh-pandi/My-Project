const express = require('express');
const router = express.Router();
const register = require('../Modules/userModule')


router.post('/signin', register.signin);
router.post('/signup', register.signup);
router.post('/contact', register.contact)

module.exports = router