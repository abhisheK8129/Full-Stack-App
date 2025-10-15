const Product = require("../../Models/Products");
const { ImageUploadUtility } = require("../../helpers/Cloudinary");

const toHandleTheImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64"); // to convert the binary data into text
    const url = "data:" + req.file.mimetype + ";base64," + b64; // create the url
    const result = await ImageUploadUtility(url);

    // if it is successfull
    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
    // if the res is not successful
    res.json({
      success: false,
      message: "some error occured",
    });
  }
};

// to add the products

const toAddProducts = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body; // get the data from body

    // create the new Product
    const newProducts = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    // save the new product
    await newProducts.save();

    // return the response
    res.status(201).json({
      success: true,
      data: newProducts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

// to fetch the products
const fetchTheProducts = async (req, res) => {
  try {
    const list = await Product.find({}); // use the empty paranthesis to fetch all the products
    res.status(200).json({
      success: true,
      data: list,
    });
    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
  };



// to edit the products
const toEditProduct = async (req, res) => {
  try {
    // first get the product id
    const {id} = req.params

    // now get the data 
    const {image,title,description,category,brand,price,salePrice,totalStock} = req.body;

    // find the product by the id
    let findProduct = await Product.findById(id);

    if (!findProduct) {
      res.status(400).json({
        success: false,
        message: "No Products Found",
      });
    }

    // if the product is available then update the product 
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    // save the findProduct
    await findProduct.save()
    res.status(200).json({
        success: true,
        data: findProduct
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};


// to delete the product
const toDeleteTheProducts = async(req,res) =>{
    try {
      const {id} = req.params;
      const deleteProdcut = await Product.findByIdAndDelete(id);
      if (!deleteProdcut) {
        res.status(400).json({
          success: false,
          message: "No product Found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "some error occured",
      });
    }

}




module.exports = { toHandleTheImageUpload, toAddProducts, fetchTheProducts, toEditProduct, toDeleteTheProducts };
