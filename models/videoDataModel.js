const mongoose = require("mongoose");

const videoInstanceSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  channelTitle: {
    type: String,
    required: true,
  },
  publishTime: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: Object,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});
const VideoDataModel = mongoose.model(
  "videoInstanceSchema",
  videoInstanceSchema
);
module.exports = VideoDataModel;
