const express = require('express')
const { addToCart, fetchFromTheCart, updateTheCart, deleteFromTheCart } = require('../../Controllers/Shopping/Cart-Controller')
const router = express.Router()

router.post('/add',addToCart)
router.get('/get/:userId',fetchFromTheCart)
router.put('/update',updateTheCart)
router.delete('/delete/:userId/:productId',deleteFromTheCart)


module.exports = router