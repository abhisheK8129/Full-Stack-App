const express = require('express')
const { addFeatureImage, getFeatureImage } = require('../../Controllers/Common/Feature-controller')

const router = express.Router()

router.post('/add-image',addFeatureImage)
router.get('/get-image',getFeatureImage)


module.exports = router
