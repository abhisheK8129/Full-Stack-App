const allProducts = require("../../Models/Products");

const searchController = async (req, res) => {
  try {
    // first get the keyword from the url
    const { keyword } = req.params;

    // if the keyword you enterend is not found or it is not a string 
    if ((!keyword !== typeof keyword) === "string") {
      return res.status(400).json({
        success: false,
        message: "No product found",
      });
    }

    // enter the keyword using RegExp
    const regexExp = new RegExp(keyword, "i");

    // use this fields to get the products 
    const createSearchQuery = {
      $or: [
        {
          title: regexExp,
        },
        {
          category: regexExp,
        },
        {
          description: regexExp,
        },
        {
          brand: regexExp,
        },
      ],
    };
    
    
    const searchResults = await allProducts.find(createSearchQuery)

    res.status(201).json({
      success: true,
      data: searchResults
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "got some error",
    });
  }
};

module.exports = { searchController };
