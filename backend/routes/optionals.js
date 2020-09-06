const express = require('express')
const router = express.Router()
const Controller = require('../controllers/optionals')
const passport = require('passport')
const auth = passport.authenticate("jwt", { session: false });
// const ControllerServices = require('../controllers/providersOptionalServices')



router.post('/',auth,Controller.addOptionals)
// router.post('/service',auth,ControllerServices.addProviderService)
// router.get('/',Controller.getService)

module.exports = router