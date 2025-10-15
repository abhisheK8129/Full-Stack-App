const express = require('express')
const { addTheAddress, editTheAddress, fetchTheAddress, deleteTheAddress } = require('../../Controllers/Shopping/Address-Controller')

const router = express.Router()

router.post('/add',addTheAddress)
router.get('/get/:userId',fetchTheAddress)
router.put('/update/:userId/:addressId',editTheAddress)
router.delete('/delete/:userId/:addressId',deleteTheAddress)


module.exports = router