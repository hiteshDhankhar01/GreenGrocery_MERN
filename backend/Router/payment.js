const express = require("express")
const { payment,paymentSuccessfull } = require('../controller/paymentController')

const router = express.Router()

router.post('/create-cheakout-session', payment)
router.put('/payment-successfull/:id', paymentSuccessfull)


module.exports = router