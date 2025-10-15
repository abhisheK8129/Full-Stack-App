const cartItems = require('../../Models/Cart')
const products = require('../../Models/Products')


const addToCart = async(req,res) =>{
    try{

        // get the userId, productId, quantity from req.body
        const {userId,productId,quantity} = req.body        
        // if the  userId or productId or quantity is false 
        if(!userId || !productId || quantity <= 0 ){
            return res.status(400).json({
                success: false,
                message: 'Data is not valid'
            })
        }
        // get the product using productId
        const availProduct = await products.findById(productId)
        // if no product is available
        if(!availProduct){
            res.status(404).json({
                success: false,
                message: 'No product found'
            })
        }
        // get the cart using userId
        let cart = await cartItems.findOne({userId})
        // if there is no cart then create the new cart 
        if(!cart){
            cart = new cartItems({userId,items: []})
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        // if findCurrentProductIndex returns -1 then push the items into the cart 
        if(findCurrentProductIndex === -1){
            cart.items.push({productId,quantity})
        }
        // if the product is already in the cart then increase the quantity of product
        else{
            cart.items[findCurrentProductIndex].quantity += quantity
        } 

        await cart.save()
        res.status(200).json({
            success: true, 
            data: cart
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Got some error'
        })
    }
}

const fetchFromTheCart = async(req,res) =>{
    try{
        const {userId} = req.params
        // if the data is invalid 
        if(!userId){
            return res.status(400).json({
                success: false,
                message: 'UserId is mandatory'
            })
        }
        // populate the cartItems and get the selected field
        const cart = await cartItems.findOne({userId}).populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })
        // if the cart is not available 
        if(!cart){
            return res.status(404).json({
                success: false,
                message: 'Cart not found!'
            })
        }
        // now filter the products which are in your cart
        const validItems = cart.items.filter(productItem => productItem.productId)
        // now check the validItems length, if the validItems length is less than the cart items length
        if(validItems.length < cart.items.length ){
            cart.items = validItems
            await cart.save()
        }

        // now map throught the valid items and get the selected field
        const populateCartItems = validItems.map((item) => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity
        }))

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Got some error'
        })
    }
}

const updateTheCart = async(req,res) =>{
    try{
      // get the userId, productId, quantity from req.body
      const { userId, productId, quantity } = req.body;

      // if the  userId or productId or quantity is false
      if (!userId || !productId || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Data is not valid",
        });
      }
      const cart = await cartItems.findOne({userId})
         if(!cart){
            return res.status(404).json({
                success: false,
                message: 'Cart not found!'
            })
        }
        const findCurrentProductIndex = cart.items.findIndex((item)=>item.productId.toString() === productId)
        if(findCurrentProductIndex === -1){
            return res.status(400).json({
                success: false,
                message: 'Cart item not presents'
            })
        }
        cart.items[findCurrentProductIndex].quantity = quantity
        await cart.save()

        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })
          const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : null,
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }))

         res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Got some error'
        })
    }
}




const deleteFromTheCart = async(req,res) =>{
    try{
        const {userId, productId}  = req.params
        if(!userId || !productId){
            return res.status(400).json({
                success: false,
                message: 'Data is invalid'
            })
        }
        const cart  = await cartItems.findOne({userId}).populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })
        if(!cart){
            return res.status(404).json({
                success: false,
                message: 'Cart not found!'
            })
        }

        cart.items  = cart.items.filter((item) => item.productId._id.toString() !== productId)
        await cart.save()

        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })

        const populateCartItems = cart.items.map((item) => ({
          productId: item.productId ? item.productId._id: null,
          image: item.productId ? item.productId.image : null,
          title: item.productId ? item.productId.title : null,
          price: item.productId ? item.productId.price : null,
          salePrice: item.productId ? item.productId.salePrice : null,
          quantity: item.quantity,
        }));
        
        
        res.status(200).json({
            
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Got some error'
        })
    }
}



module.exports = {addToCart,fetchFromTheCart,updateTheCart,deleteFromTheCart}