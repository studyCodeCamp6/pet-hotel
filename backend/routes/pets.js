const express = require("express");
const router = express.Router();
const passport = require('passport')
const auth = passport.authenticate("jwt", { session: false });
const controllers = require('../controllers/pets')


router.get("/", auth, controllers.getPetsByCustomers)
router.post("/", auth, controllers.registerPets)
router.post("/pets", auth, controllers.addPets)
router.delete("/delete/:id", auth, controllers.deletePets)



module.exports = router;