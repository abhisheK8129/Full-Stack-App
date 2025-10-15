const express = require('express')
const { getTheFilteredProducts, getTheProductsDetails } = require('../../Controllers/Shopping/Products-controller')
const router = express.Router()


router.get('/get',getTheFilteredProducts)
router.get('/get/:id',getTheProductsDetails)




module.exports = router