const express = require("express");
const router = express.Router();

const controllers = require('../controllers/pets')
// const auth = passport.authenticate("jwt", { session: false });


router.post("/register/pets",controllers.registerPets)



module.exports = router;