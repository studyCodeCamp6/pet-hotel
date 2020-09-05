const express = require('express')
const router = express.Router()
const Controller = require('../controllers/bill')

router.post('/',Controller.addBill)

module.exports = router