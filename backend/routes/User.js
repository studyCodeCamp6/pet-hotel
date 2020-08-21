const express = require(express)
const router = express.Router()
const UserController = require('../controller')

router.post('/register',UserController)





module.exports = router