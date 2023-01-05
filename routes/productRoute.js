const { createProduct, getAllProduct, updateProduct, deleteProduct, getProductDetails, getAllProductHome } = require('../controller/productController')

const router = require('express').Router()

router.route('/createProduct').post(createProduct)
router.route('/getAllProduct').get(getAllProduct)
router.route('/getAllProductHome').get(getAllProductHome)
router
    .route('/products/:id')
    .put(updateProduct)
    .get(getProductDetails)

router.route('/products/delete').post(deleteProduct)

module.exports = router