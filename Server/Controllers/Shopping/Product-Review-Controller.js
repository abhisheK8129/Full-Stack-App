const  Order = require('../../Models/Order')
const Product = require('../../Models/Products')
const ProductReview = require('../../Models/Reviews')


const addReview = async(req,res)=>{
    try{
        const {productId,userId,username,reviewMessage,reviewValue} = req.body

        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            orderStatus: "confirmed",
        })
        if(!order){
            return res.status(403).json({
                success: false,
                message: 'first you need to purchase this product to review'
            })
        }

        const checkExistingReview  = await ProductReview.findOne({productId,userId})
        if(checkExistingReview){
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this product'
            })
        }


        const newReview = new ProductReview({
            productId,userId,username,reviewMessage,reviewValue
        })

        await newReview.save()

        const reviews = await ProductReview.find({})
        const getAllReviewsLength = reviews.length
        const averageReview = reviews.reduce((sum,reviewItem)=> { return sum + reviewItem.reviewValue}, 0) / getAllReviewsLength

        await Product.findByIdAndUpdate(productId,{averageReview})

        res.status(201).json({
            success: true,
            data: newReview
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Got some error'
        })
    }
}


const getReviews = async(req,res)=>{
      try{
        const {productId} = req.params

        const Reviews = await ProductReview.find({productId})
        res.status(200).json({
            success: true,
            data: Reviews
        })

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Got some error'
        })
    }
}


module.exports = {addReview,getReviews}