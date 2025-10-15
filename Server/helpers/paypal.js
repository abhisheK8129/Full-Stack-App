const paypal = require('paypal-rest-sdk')


paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PayPal_Client_id ,
    client_secret: process.env.PayPal_Client_Secret_Key
})


  
module.exports = paypal