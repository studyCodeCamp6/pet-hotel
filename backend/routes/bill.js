const express = require('express')
const router = express.Router()
const passport = require("passport");

const Controller = require('../controllers/bill')

const auth = passport.authenticate("jwt", { session: false });

router.post('/',auth,Controller.addBill)

module.exports = router