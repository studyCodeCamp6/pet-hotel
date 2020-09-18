const express = require('express');
const router = express.Router();

const controllers = require('../controllers/admins');
const passport = require('passport');

const auth = passport.authenticate('jwt', { session: false });

router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.patch('/role', auth, controllers.setRole);
router.get('/profile', auth, controllers.getProfile);

module.exports = router;
