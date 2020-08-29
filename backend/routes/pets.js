const express = require("express");
const router = express.Router();

const controllers = require('../controllers/pets')
// const auth = passport.authenticate("jwt", { session: false });


router.get("/",controllers.getPetsByCustomers)
router.post("/",controllers.registerPets)
router.delete("/deleted/:id",controllers.deletePets)



module.exports = router;