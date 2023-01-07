const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    oldPrice: {
        type: Number,
        required: false,
        maxLength: [8, "Price cannot exceed 8 characters"],
        default: null
    },
    selectedC: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        default: 0,
    },
    Option: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"],
    },
    features: {
        type: String,
        required: [true, "Please Enter product Description"],
    },
    selectedFile: {
        type: Array,
        required: [false, "Please Enter Product image"],
    },
    category: {
        type: String,
        required: [false, "Please Enter Product Category"],
    },
    Stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Product = mongoose.model('Product', productSchema)

module.exports = Product