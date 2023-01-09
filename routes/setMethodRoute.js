const { setMethod, getMethod, paymentInfo } = require("../controller/PaymentMethod")

const router = require("express").Router()

router.route('/set-method').post(setMethod)
router.route('/get-method').get(getMethod)
router.route('/get-payment-info').get(paymentInfo)

module.exports = router