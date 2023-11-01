const express = require("express")
const { addProuduct, findProducts, productDetails } = require('../controller/productController')

const router = express.Router()

router.post('/addProduct', addProuduct)
//router.get('/allProducts', getAllProducts)
// router.get('/allFruits', getProducts)
//router.post('/searchProductsfix', findProducts)
router.get('/findProducts', findProducts)
router.get('/productDetails/:id', productDetails)

module.exports = router