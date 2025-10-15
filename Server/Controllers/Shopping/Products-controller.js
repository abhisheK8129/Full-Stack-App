const Product = require("../../Models/Products");

const getTheFilteredProducts = async (req, res) => {
  try {
    const {
      category = [],
      brand = [],
      price = [],
      salePrice = [],
      sortBy = "price-lowToHigh",
    } = req.query;
    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    const PriceRange = {
      "1rsto1000rs": { $gte: 1, $lte: 1000 },
      "1000rsto2000rs": { $gte: 1000, $lte: 2000 },
      "2000rsto3000rs": { $gte: 2000, $lte: 3000 },
      "3000rsto4000rs": { $gte: 3000, $lte: 4000 },
      "4000rstoInfinity": { $gte: 4000, $lte: Infinity },
    };

    if (price.length) {
      const selectedPrices = price.split(",");

      filters.$or = selectedPrices.map((key) => {
        const range = PriceRange[key]; // key of the price ranges

        return {
          $or: [
            // when the salePrice is available or it  is not 0...
            { salePrice: { ...range, $ne: 0 } },

            // when the salePrice is 0 and price has no sale available...
            {
              $and: [
                //    { $or: [ { salePrice: { $exists: false } }, { salePrice: 0 } ] },
                { salePrice: 0 },
                { price: range },
              ],
            },
          ],
        };
      });
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowToHigh":
        sort.price = 1;
        break;
      case "price-highToLow":
        sort.price = -1;
        break;

      case "title-a-z":
        sort.title = 1;
        break;

      case "title-z-a":
        sort.title = -1;
        break;

      default:
        sort.price = 1;
        break;
    }

    const ShoppingProducts = await Product.find(filters).sort(sort);
    res.status(200).json({
      success: true,
      data: ShoppingProducts,
    });
  } catch (err) {
    console.log(err, "error");
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};


const getTheProductsDetails = async(req,res) =>{
    try{
        // get the id from req.params
        const {id} = req.params;
        // find the product through its id
        const shopProduct = await Product.findById(id) 

        // if the product is not available  
        if(!shopProduct){
            return res.status(404).json({
                success: false,
                message: 'No Product found'
            })
        }

        
        return res.status(200).json({
            success: true,
            data: shopProduct,
        })



    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'some error occured'
        })
        
    }
}


module.exports = { getTheFilteredProducts, getTheProductsDetails };
