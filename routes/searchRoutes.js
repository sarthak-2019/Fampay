const express = require("express");
const searchController = require("./../controllers/searchController");
const router = express.Router();

router.route("/searchAll").get(searchController.getAllVideos);
router.route("/search").get(searchController.getVideos);
module.exports = router;
