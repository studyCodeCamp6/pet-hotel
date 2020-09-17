const express = require("express")
const router = express.Router();
const passport = require('passport')
const controllers = require("../controllers/providers")
const controllersGetService = require('../controllers/providerOptionService')
const auth = passport.authenticate("jwt", { session: false });

router.post("/new/hotel", auth, controllers.register);
router.get('/', auth, controllers.getProvider)
router.get('/service', auth, controllersGetService.getService)
router.get('/token', auth, controllers.getProviderToken)
router.delete('/service/:id', auth, controllersGetService.deleteService)
router.put('/service/:id',auth,controllers.updateProvider)
router.patch('/role', auth, controllers.setRole)
router.get('/reviews', auth, controllers.getProviderReviews)

module.exports = router