const cloudinary = require("cloudinary").v2
const multer = require("multer");


cloudinary.config({
  cloud_name: process.env.Cloudinary_Name,
  api_key: process.env.Cloudinary_Api_key,
  api_secret: process.env.Cloudinary_Api_secret
})


const storage = new multer.memoryStorage()

async function ImageUploadUtility(file) {
  const result = await cloudinary.uploader.upload(file,{
    resource_type: 'auto'

  })  
  return result
     
}


const upload = multer({storage})

module.exports =  {upload,ImageUploadUtility}