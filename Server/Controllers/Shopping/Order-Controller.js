const paypal = require("../../helpers/paypal");
const order = require("../../Models/Order");
const CART = require("../../Models/Cart");
const product  = require('../../Models/Products')

const createOrder =  (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    // will help us to create paypal payment instance
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.Client_Side_Url}/shopping/paypal-return`,
        cancel_url: `${process.env.Client_Side_Url}/shopping/paypal-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    // create the paypal payment
    paypal.payment.create(create_payment_json, async (error,paymentInfo) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment",
        });
      } else {
        const newOrder = new order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newOrder.save()
        
        const approvalUrl = paymentInfo.links.find((link)=> link.rel === "approval_url").href
        
        res.status(201).json({
            success: true,
            approvalUrl,
            orderId: newOrder._id
        })
      }

    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "got an error",
    });
  }
};



const captureThePayment = async (req, res) => {
  try {
    const {paymentId,payerId, orderId} = req.body 
    const findOrder = await order.findById(orderId) 

    if(!orderId){
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }
    findOrder.paymentStatus = 'paid'
    findOrder.orderStatus = 'confirmed'
    findOrder.paymentId = paymentId
    findOrder.payerId = payerId
    
    // run the for loop for the cart items 
    for(let item of findOrder.cartItems){
      // find the items using productId
      let Products = await product.findById(item.productId)

      // if item is not found then return the error
      if(!Products){
        return res.status(404).json({
          success: false,
          message: `Not enough stock ${Products.title}`
        })
      }

      // reduce the total stock according to the quantity of the item 
      Products.totalStock -= item.quantity

      // save the item
      await Products.save()
    }

    // get the cart items using cart id
    const getTheCartItems = findOrder.cartId
    // delete the cart items
    await CART.findByIdAndDelete(getTheCartItems)

    await findOrder.save()

    res.status(200).json({
      success: true,
      message: 'Your order is confirmed',
      data: findOrder
    })


  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "got an error",
    });
  }
};



const getAllOrders = async(req,res) =>{
  try{
    const {userId} = req.params
    
    const fetchedOrders = await  order.find({userId})

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



const getOrderDetails = async(req,res) =>{
  try{
    const {id} = req.params
    
    const fetchOrderDetails = await  order.findById(id)

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
      message: 'Your product is deleted from the list'
    })
  }
  catch(err){
    return res.status(500).json({
      success: false,
      message: 'got some erron in deleting the order'
    })
  }

}





module.exports = { createOrder, captureThePayment,getAllOrders,getOrderDetails , deleteOrders};
