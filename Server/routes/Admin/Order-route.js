
const express = require('express')
const { getAllOrdersOfUsers, getOrderDetailsForAdmin, deleteOrders, updateOrder,  } = require('../../Controllers/Admin/Order-controller')


const route = express.Router()



route.get('/get',getAllOrdersOfUsers)
route.get('/details/:id',getOrderDetailsForAdmin)
route.delete('/delete/:id',deleteOrders)
route.put('/update/:id',updateOrder)



module.exports = route

