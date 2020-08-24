const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')

router.post('/register',UserController.register)
router.post('/register/pets',UserController.register)





module.exports = router