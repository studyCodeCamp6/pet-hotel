const express = require("express")
const router = express.Router();
const passport = require('passport')
const controllers = require("../controllers/providers")
const controllersGetService = require('../controllers/providerOptionService')
const auth = passport.authenticate("jwt", { session: false });

router.post("/add", auth, controllers.register);
router.get('/',auth,controllers.getProvider)
router.get('/service',auth,controllersGetService.getService)
router.delete('/service/:id',auth,controllersGetService.deleteService)
router.put('/service/:id',auth,controllers.updateProvider)

module.exports = router