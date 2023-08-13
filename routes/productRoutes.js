const express = require("express");
const productController = require("../controllers/productController");
const upload = require("../config/multer");
const authController = require("../controllers/authController");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router
  .route("/")
  .post(
    upload.upload.single("image"),
    productController.createProduct,
    productController.getProducts
  )
  .get(productController.getProducts);

router
  .route("/:id")
  .get(productController.getAProduct)
  .patch(
    upload.upload.single("image"),
    productController.updateProduct,
    deleteFile,
    productController.getProducts
  )
  .delete(
    productController.deleteProduct,
    deleteFile,
    productController.getProducts
  );

module.exports = router;
