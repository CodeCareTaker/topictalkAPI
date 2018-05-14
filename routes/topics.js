const express = require("express");
const router = express.Router({ mergeParams: true });
const { createTopic, getTopic, updateTopic, deleteTopic } = require("../handlers/topics");

router.route("/").post(createTopic);

router
  .route("/:topic_id")
  .get(getTopic)
  .put(updateTopic);
  .delete(deleteTopic);

module.exports = router;