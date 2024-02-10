const express = require("express")
const { addProuduct, findProducts, productDetails, productRating } = require('../controller/productController')

const router = express.Router()

router.post('/addProduct', addProuduct)
router.get('/findProducts', findProducts)
router.get('/productDetails/:id', productDetails)
router.put('/review/:id', productRating)

module.exports = router