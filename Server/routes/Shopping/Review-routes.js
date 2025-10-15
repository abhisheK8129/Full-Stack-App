const express = require('express')
const { addReview, getReviews } = require('../../Controllers/Shopping/Product-Review-Controller')

const router  = express.Router()


router.post('/addReview',addReview)
router.get('/:productId',getReviews)



module.exports = router