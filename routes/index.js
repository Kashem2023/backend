const router = require("express").Router()
const userRoute = require("./userRoute")
const productRoute = require("./productRoute")
const PaymentRoute = require("./PaymentRoute")
const orderRoute = require("./orderRoute")
const methodRoute = require("./setMethodRoute")

router.use("/api", userRoute)
router.use("/api", productRoute)
router.use("/api", PaymentRoute)
router.use("/api", orderRoute)
router.use("/api", methodRoute)

module.exports = router