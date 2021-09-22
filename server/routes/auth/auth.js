const express = require('express');
const router = express.Router();

const { createUser, logInUser } = require('../../controllers/auth/auth');
router.route('/register').post(createUser);
router.route('/login').post(logInUser);

module.exports = router;
