const Address = require("../../Models/Address");

const addTheAddress = async (req, res) => {
  try {
    const { userId, address, phoneNo, pincode, city, country, landmark } =
      req.body;

    if (
      !userId ||
      !address ||
      !phoneNo ||
      !pincode ||
      !city ||
      !country ||
      !landmark
    ) {
      return res.status(404).json({
        success: false,
        message: "Invalid details",
      });
    }

    const createNewAddress = new Address({
      userId,
      address,
      phoneNo,
      pincode,
      city,
      country,
      landmark,
    });

    await createNewAddress.save();

    res.status(201).json({
      success: true,
      data: createNewAddress,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "got an error",
    });
  }
};

const fetchTheAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid details",
      });
    }

    const address = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "got an error",
    });
  }
};

const editTheAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formdata = req.body

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "Invalid details",
      });
    }

    const editAddr = await Address.findOneAndUpdate(
      { userId, _id: addressId },
      formdata,
      { new: true }
    );

    if (!editAddr) {
      return res.status(404).json({
        success: false,
        message: "No address found",
      });
    }

    res.status(200).json({
      success: true,
      data: editAddr,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "got an error",
    });
  }
};

const deleteTheAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "address not found",
      });
    }
    const deleteAdrs =  await Address.findOneAndDelete({ userId, _id: addressId });

    if (!deleteAdrs) {
      return res.status(404).json({
        success: false,
        message: "No address found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Got an error",
    });
  }
};

module.exports = {
  addTheAddress,
  fetchTheAddress,
  editTheAddress,
  deleteTheAddress,
};
