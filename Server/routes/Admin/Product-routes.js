const express = require("express");
const {
  toHandleTheImageUpload,
  toAddProducts,
  fetchTheProducts,
  toEditProduct,
  toDeleteTheProducts,
} = require("../../Controllers/Admin/Products-controller");

const { upload } = require("../../helpers/Cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), toHandleTheImageUpload);
router.post("/add", toAddProducts);
router.get("/get", fetchTheProducts);
router.put("/edit/:id", toEditProduct);
router.delete("/delete/:id", toDeleteTheProducts);

module.exports = router;
