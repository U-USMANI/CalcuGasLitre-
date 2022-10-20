var SECRET_KEY = "sk_test_51LT391E7wisJKxR4WbQltuj8M5WJrNpsgmwEEZL07HetWfymN118kATTdbbnZux4OQ2owLsIhINGFu0V9KHb9e600088vWaHPR"
var PUBLISHABLE_KEY = "pk_test_51LT391E7wisJKxR4dKX88cy85UEcO34ZbO9tupIiSrgyy90U3zjsNt39OUHnqNiMnbqy1gNuCxgHsvPBrn60jpmd00PhB2hNNV"
const stripe = require('stripe')(SECRET_KEY)

const Card = require('../models/Card')
const { User } = require("../models/User")

//Add Category 
const addCardDetails = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id })
        if (!user) {
            return res.status(400).json({ status: 0, msg: "User not found" })
        } else {
            const date = req.body.exp_month + "/" + req.body.exp_year
            const cardData = new Card
            cardData.email = user.user_email,
            cardData.card_number = req.body.number
            cardData.cvc = req.body.cvc
            cardData.expire_date = date
            cardData.userId = user._id
    
            if (cardData) {
        var param = {}
        param.card = {
            number: req.body.card_number,
            exp_month: req.body.exp_month,
            exp_year: req.body.exp_year,
            cvc: req.body.cvc
        }
        stripe.tokens.create(param, async function (err, token) {
            if (err) {
                console.log(err.message);
                return res.status(500).json({ error: err.message })
            }
            if (token) {
                cardData.tokenId = token.id
                cardData.amount = req.body.amount
                cardData.description = req.body.description
                await cardData.save()
                // return res.send(token)
                stripe.customers.create({
                    email: user.user_email,
                    source: token.id,
                    name: user.full_name,
                    address: {
                        line1: '23 Valley Karachi',
                        postal_code: '112233',
                        city: 'karachi',
                        state: 'sindh',
                        country: 'Pakistan'
                    }
                }).then((customer) => {
                    return stripe.charges.create({
                        amount: req.body.amount,
                        description: req.body.description,
                        currency: 'USD',
                        customer: customer.id
                    })
                }).then((charge) => {
                    return res.status(201).json({ status: 1, msg: "Card Data Inserted", charge: charge })
                }).catch((err) => {
                    res.send("error======>" + err.message)
                })
            }
        })
    } else {
        return res.status(400).json({ status: 0, msg: "Something went wrong" })
    }
}
    } catch (error) {
    console.log(error.message)
    return res.status(500).json({ error: err.message })
}
}
module.exports = {
    addCardDetails,
}