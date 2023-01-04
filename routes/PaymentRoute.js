const { processPayment, sendStripeApiKey } = require('../controller/paymentcontroller');

const router = require('express').Router()

router.route("/payment/process").post(processPayment);

router.route("/payment/stripeapikey").get(sendStripeApiKey);


module.exports = router