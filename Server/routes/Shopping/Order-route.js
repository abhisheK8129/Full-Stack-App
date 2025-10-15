const express = require('express')
const { createOrder, captureThePayment, getAllOrders, getOrderDetails, deleteOrders } = require('../../Controllers/Shopping/Order-Controller')

const route = express.Router()


route.post('/create',createOrder)
route.post('/capture',captureThePayment)
route.get('/list/:userId',getAllOrders)
route.get('/details/:id',getOrderDetails)
route.delete('/delete/:id',deleteOrders)


module.exports = route 