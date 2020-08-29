const express = require("express");
const router = express.Router();
const passport = require("passport");

const controllers = require('../controllers/histories')
const auth = passport.authenticate("jwt", { session: false });

router.get("/customers",auth,controllers.getCustomerHistories)
router.get("/providers",auth,controllers.getProviderHistories)


module.exports = router;