const mongoose = require("mongoose");

const methodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Method = mongoose.model('Methos', methodSchema)

module.exports = Method