const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    card_number: {
        type: Number,
        // require: true,
        // max: 16
    },
    email: {
        type: String,
        // require: true,
        // max: 16
    },
    tokenId: {
        type: String,
        default: null
    },
    exp_month: {
        type: String,
        // required: true,
    },
    amount: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: null
    },
    exp_year: {
        type: Number,
        // required: true,
    },
    cvc: {
        type: Number,
        // required: true,
        // max: 4
    },
},
    { timestamps: true }
);

const CardDetails = mongoose.model('CardDetails', categoriesSchema)

module.exports = CardDetails







