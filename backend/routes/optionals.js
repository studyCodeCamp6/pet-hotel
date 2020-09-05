const express = require('express')
const router = express.Router()
const Controller = require('../controllers/optionals')
const passport = require('passport')
const ControllerServices = require('../controllers/providersOptionalServices')
const auth = passport.authenticate("jwt", { session: false });



router.post('/',auth,Controller.addOptionals)
router.post('/service',auth,ControllerServices.addProviderService)
// router.get('/',Controller.getService)

module.exports = router