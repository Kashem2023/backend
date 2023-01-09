const Product = require('../models/productSchema')
const ErrorHandler = require('../error/ErrorHandler')
const catchAsyncError = require('../middleware/asyncError')
const Order = require('../models/orderSchema')
const nodeMailer = require("nodemailer")

const sendEmail = async (options) => {

    const transporter = nodeMailer.createTransport({
        host: 'smpt.gmail.com',
        port: 465,
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: options.email,
        subject: "Order Complete Mail",
        text: `your Order complete succesfully`,
    };

    await transporter.sendMail(mailOptions);
    
};


//create Order Bank
exports.newOrderBank = catchAsyncError(async (req, res, next) => {

    const {
        billingAdress,
        orderItems,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        billingAdress,
        orderItems,
        totalPrice,
        user: req.user._id,
        method: "Banking"
    });

    sendEmail(billingAdress)


    res.status(201).json({
        success: true,
        order,
    });

})

//create Order Stripe
exports.newOrderStripe = catchAsyncError(async (req, res, next) => {

    const {
        billingAdress,
        orderItems,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        billingAdress,
        orderItems,
        totalPrice,
        user: req.user._id,
        method: "Stripe"
    });

    res.status(201).json({
        success: true,
        order,
    });

})

// get Single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
})


// get logged in user  Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    });
});


// get all Orders -- Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});



// update Order Status -- Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);


    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }


    order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
    });

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}


// delete Order -- Admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});