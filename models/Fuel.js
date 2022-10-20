const mongoose = require('mongoose')
const Car = require ('./Car')

const fuelSchema = new mongoose.Schema({
    fuelPrice: {
        type: Number,
        req: true
    },
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    fuelQuantity: {
        type: Number,
        req: true
    },
    carId: {
        type: String
    },
    fromdate: {
        type: String,
        req: true
    },
    todate: {
        type: String,
        req: true
    },
    totalPrice: {
        type: Number,
        req: true
    },
    totalQty: {
        type: Number,
        req: true
    },
 
    }, { timestamps: true });
   

const Fuel = mongoose.model('Fuel', fuelSchema)

module.exports = Fuel
