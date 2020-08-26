const express = require("express");
const router = express.Router();
const passport = require('passport')

const controllers = require("../controllers/bills")
const auth = passport.authenticate("jwt", { session: false });

router.get("/",auth,controllers.bills);


module.exports = router;