const cron = require("node-cron");
const axios = require("axios");
const VideoDataModel = require("./../models/videoDataModel");
const tag = [
  "cricket",
  "food",
  "music",
  "travel",
  "football",
  "games",
  "memes",
  "minecraft",
  "art",
  "stand up comedy",
];
let tag_index = 0;
let token_index = 0;

const addVideoToDb = async (data) => {
  const oldVideo = await VideoDataModel.findOne({ videoId: data.videoId });
  if (oldVideo) {
    console.log("Video Already Exist in the Database");
    return;
  }
  const newVideo = await VideoDataModel.create({
    ...data,
  });
  return newVideo;
};

module.exports = () => {
  var tokens = process.env.API_KEY.split(",");
  cron.schedule("*/10 * * * * *", function () {
    const TAG_INDEX_NUMBER = tag_index % 10;
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?q=${tag[TAG_INDEX_NUMBER]}&part=snippet&key=${tokens[token_index]}`
      )
      .then(async function (response) {
        const data = response.data.items;
        for (let i = 0; i < data.length; i++) {
          let video_data = {};
          video_data.videoId = data[i].id.videoId;
          video_data.channelTitle = data[i].snippet.channelTitle;
          video_data.publishTime = new Date(data[i].snippet.publishTime);
          video_data.title = data[i].snippet.title;
          video_data.description = data[i].snippet.description;
          video_data.thumbnails = data[i].snippet.thumbnails;
          video_data.tag = tag[TAG_INDEX_NUMBER];
          let check = true;
          Object.keys(video_data).forEach(function eachKey(key) {
            if (!video_data[key]) {
              check = false;
            }
          });
          if (!check) continue;
          const uploaded_Data = await addVideoToDb(video_data);
          if (uploaded_Data) {
            console.log("Video Uploaded To Database");
          }
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error.response.data);
        if (error.response.data.error.code === 403) {
          token_index = token_index + 1;
          if (token_index === process.env.TOTAL_TOKENS * 1) {
            token_index = 0;
          }
        }
      });
    tag_index = tag_index + 1;
    if (tag_index === 10000) tag_index = 0;
  });
};
