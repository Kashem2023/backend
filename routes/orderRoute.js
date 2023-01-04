const { getSingleOrder, myOrders, getAllOrders, deleteOrder, updateOrder, newOrderBank, newOrderStripe } = require("../controller/orderController")
const { isAuthenticatedUser } = require("../middleware/auth")


const router = require("express").Router()


router.route('/order/new').post(isAuthenticatedUser, newOrderBank)
router.route('/order/newStripe').post(isAuthenticatedUser, newOrderStripe)
router.route('/order/:id').get(getSingleOrder)
router.route('/orders/me').get(isAuthenticatedUser, myOrders)
router.route('/admin/orders/me').get(getAllOrders)

router.route('/admin/orders/:id')
    .delete(deleteOrder)
    .put(updateOrder)


module.exports = router