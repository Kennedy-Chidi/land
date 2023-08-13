const express = require("express");
const eventController = require("../controllers/eventController");
const upload = require("../config/multer");
const authController = require("../controllers/authController");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router
  .route("/")
  .post(
    upload.upload.single("image"),
    eventController.createEvent,
    eventController.getEvent
  )
  .get(eventController.getEvent);

router
  .route("/:id")
  .get(eventController.getAEvent)
  .patch(
    upload.upload.single("image"),
    eventController.updateEvent,
    deleteFile,
    eventController.getEvent
  )
  .delete(eventController.deleteEvent, deleteFile, eventController.getEvent);

module.exports = router;
