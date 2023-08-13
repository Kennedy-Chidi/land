const express = require("express");
const blogController = require("../controllers/blogController");
const upload = require("../config/multer");
const authController = require("../controllers/authController");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router
  .route("/")
  .post(
    upload.upload.single("banner"),
    blogController.createBlog,
    blogController.getBlog
  )
  .get(blogController.getBlog);

router
  .route("/:id")
  .get(blogController.getABlog)
  .patch(
    upload.upload.single("banner"),
    blogController.updateBlog,
    deleteFile,
    blogController.getBlog
  )
  .delete(blogController.deleteBlog, deleteFile, blogController.getBlog);

module.exports = router;
