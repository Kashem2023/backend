const { setMethod, getMethod } = require("../controller/PaymentMethod")

const router = require("express").Router()

router.route('/set-method').post(setMethod)
router.route('/get-method').get(getMethod)

module.exports = router