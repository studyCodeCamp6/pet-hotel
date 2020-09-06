const express = require('express')
const router = express.Router()
const passport = require('passport')
const auth = passport.authenticate("jwt", { session: false });
const Controller = require('../controllers/bill')
const ControllerPetsBills = require('../controllers/pet_bill')

router.post('/', auth, Controller.addBill)
router.post('/optionals/services', auth, Controller.billOptionalService)
router.post('/pets-bills', auth, ControllerPetsBills.addPetsBills)
// router.post('/services-bills',auth,ControllerPetsBills)

module.exports = router