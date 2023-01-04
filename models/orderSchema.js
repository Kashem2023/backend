const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    billingAdress: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        firstAdress: {
            type: String,
            required: true,
        },
        lastAdress: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },

        country: {
            type: String,
            required: true,
        },
        postalCode: {
            type: Number,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            selectedFile: {
                type: Array,
                required: true,
            }
        },
    ],
    user: {
        type: String,
        ref: "User",
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    paymentInfo: {
        status: {
            type: Boolean,
            required: true,
            default: true
        },
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



const Order = mongoose.model('Order', orderSchema)

module.exports = Order