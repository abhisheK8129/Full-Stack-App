const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({

    userId: String,
    address: String,
    phoneNo: String,
    pincode: String,
    city: String,
    country: String,
    landmark: String,
},{timestamps:true})




module.exports = mongoose.model('Address',AddressSchema)