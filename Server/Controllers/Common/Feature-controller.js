const allFeatures = require("../../Models/Features")


const addFeatureImage = async(req,res) =>{
    try{

        const {image} = req.body
         
        const featureImages = new allFeatures({
            image
        }) 
        await featureImages.save()
        res.status(201).json({
            success: true,
            data: featureImages
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'got some an error'

        })
        
    }
}
const getFeatureImage = async(req,res) =>{
    try{

        const getImages = await  allFeatures.find({})

        res.status(200).json({
            success: true,
            data: getImages
        })

      
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'got some an error'

        })
        
    }
}



module.exports = {addFeatureImage,getFeatureImage}