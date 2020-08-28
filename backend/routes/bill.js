const express = require('express')
const router = express.Router
const BillController = require('../controllers/bill')

router.post('/',BillController.addBill)

module.exports = router