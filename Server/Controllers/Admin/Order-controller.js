const order = require("../../Models/Order");




const getAllOrdersOfUsers = async(req,res) =>{
  try{
    
    const fetchedOrders = await  order.find({})

    if(!fetchedOrders.length){
      return  res.status(404).json({
        success: false,
        message: 'No orders found'
      })
    }

    res.status(200).json({
      success: true,
      data: fetchedOrders
    })

  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'got some an error'
      
    })
    
  }
}



const getOrderDetailsForAdmin = async(req,res) =>{
  try{
    const {id} = req.params
    
    const fetchOrderDetails = await order.findById(id)

    if(!fetchOrderDetails){
      return  res.status(404).json({
        success: false,
        message: 'No items found'
      })
    }

    res.status(200).json({
      success: true,
      data: fetchOrderDetails
    })

  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'got some an error'
      
    })
    
  }
}

const updateOrder = async(req,res) =>{
  try{

    const {id} = req.params
    const {orderStatus} = req.body 

    const findTheOrder = await order.findById(id)

    if(!findTheOrder){
      return res.status(404).json({
        success: false,
        message: 'No order found'
      })
    }

    await order.findByIdAndUpdate(id,{orderStatus})
    res.status(200).json({
      success: true,
      message: 'Status updated successfully'
    })
  }
  catch(err){
    return res.status(500).json({
      success: false,
      message: 'got some erron in deleting the order'
    })
  }

}



const deleteOrders = async(req,res) =>{
  try{

    const {id} = req.params
    const deleteOrders = await order.findByIdAndDelete(id)
    if(!deleteOrders){
      return res.status(404).json({
        success: false,
        message: 'No order found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Your Item is deleted from the list'
    })
  }
  catch(err){
    return res.status(500).json({
      success: false,
      message: 'got some erron in deleting the order'
    })
  }

}






module.exports = { getAllOrdersOfUsers, getOrderDetailsForAdmin, deleteOrders,updateOrder};
