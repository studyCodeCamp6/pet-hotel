const express = require('express')
const router = express.Router()
const Controller = require('../controllers/optionals')

router.post('/',Controller.addOptionals)

module.exports = router