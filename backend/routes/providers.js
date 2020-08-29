const express = require("express")
const router = express.Router();
const passport = require('passport')
const controllers = require("../controllers/providers")
const auth = passport.authenticate("jwt", { session: false });

router.post("/add", auth, controllers.register);

module.exports = router