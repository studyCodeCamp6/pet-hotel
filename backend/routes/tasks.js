const express = require("express");
const router = express.Router();
const passport = require("passport");

const controllers = require("../controllers/tasks");
const auth = passport.authenticate("jwt", { session: false });

router.get("/customers", auth, controllers.getCustomerBills);
router.post("/customers", auth, controllers.CreateCustomerBills);
router.patch("/customers/:bId", auth, controllers.UpdateCustomerBIlls);

router.get("/providers", auth, controllers.getProviderBills);
router.patch("/providers/:bId", auth, controllers.UpdateProviderBIlls);

module.exports = router;
