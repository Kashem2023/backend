const router = require("express").Router()
const userRoute = require("./userRoute")
const productRoute = require("./productRoute")
const PaymentRoute = require("./PaymentRoute")
const orderRoute = require("./orderRoute")
const methodRoute = require("./setMethodRoute")
const { AddLogo, getLogo } = require("../controller/addLogo")
const { addCategories, getCategories, deleteCategories } = require("../controller/addCatergories")

router.use("/api", userRoute)
router.use("/api", productRoute)
router.use("/api", PaymentRoute)
router.use("/api", orderRoute)
router.use("/api", methodRoute)


router.post("/api/addlogo", AddLogo)
router.get("/api/getlogo", getLogo)


router.post("/api/addCategories", addCategories)
router.get("/api/getCategories", getCategories)
router.post("/api/delCategories", deleteCategories)

module.exports = router