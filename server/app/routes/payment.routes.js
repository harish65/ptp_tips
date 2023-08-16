var express = require('express');
var router = express.Router();
const payment = require('../controllers/payment.cotroller');

router.get('/all-payment-plans', payment.getPaymentPlans);
router.get('/all-payment-plans', payment.oneTimePayment);

module.exports = router