const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false });
const controllers = require('../controllers/payment');

router.post('/checkout-credit-card', auth, controllers.omiseCheckoutCreditCard);
router.post(
  '/checkout-internetBanking',
  auth,
  controllers.omiseCheckoutInternetBanking
);
router.post('/webhooks', auth, controllers.omiseWebHooks);
router.get('/bank-charge', auth, controllers.getInternetBankingCharge);
router.post('/transfers', auth, controllers.omiseTransfer);

module.exports = router;
