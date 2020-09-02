const express = require('express')
const router = express.Router()
const Controller = require('../controllers/optionals')
const ControllerServices = require('../controllers/providersOptionalServices')

router.post('/',Controller.addOptionals)
router.post('/service',ControllerServices.addProviderService)
router.get('/',Controller.getService)

module.exports = router