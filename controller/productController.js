const Product = require('../models/productSchema')
const ErrorHandler = require('../error/ErrorHandler')
const catchAsyncError = require('../middleware/asyncError')
const ApiFeatures = require('../utils/apiFeatures')

/**
 * Create Product
 */
exports.createProduct = catchAsyncError(async (req, res) => {

    const product = await Product.create(req.body)

    res.status(201).json(
        {
            success: true,
            product
        }
    )

})


/**
 * get product home
 */
exports.getAllProductHome = catchAsyncError(async (req, res) => {
    const product = await Product.find()

    const size = 7;
    const products = product.slice(0, size)

    res.status(200).json({
        success: true,
        products
    })
})


/**
 * get product with filter
 */
exports.getAllProduct = catchAsyncError(async (req, res) => {

    const prodcutCount = await Product.countDocuments()

    const apifeature = new ApiFeatures(Product.find(), req.query)
        .search()

    const products = await apifeature.query

    res.status(200).json(
        {
            success: true,
            products,
            prodcutCount
        }
    )

})


/**
 * Update product
 */
exports.updateProduct = catchAsyncError(async (req, res) => {

    let product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json(
        {
            success: true,
            product
        }
    )

})


/**
 * DeleteProduct
 */
exports.deleteProduct = catchAsyncError(async (req, res) => {

    let product = await Product.findById(req.body.id)


    if (!product) {
        return res.status(500).json({
            success: false,
            message: "product not found"
        })
    }

    await product.remove()

    res.status(200).json(
        {
            success: true,
            message: "product deleted successfully"
        }
    )

})

/**
 * get Product Details
 */
exports.getProductDetails = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    res.status(200).json(
        {
            success: true,
            product
        }
    )

})