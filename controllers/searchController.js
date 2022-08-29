const VideoDataModel = require("./../models/videoDataModel");
const handleApi = require("./handleApi");

exports.getAllVideos = handleApi.getAll(VideoDataModel);

exports.getVideos = async (req, res) => {
  try {
    result = await VideoDataModel.aggregate([
      {
        $search: {
          index: "autocomplete",
          autocomplete: {
            query: "chill",
            path: "title",
            fuzzy: {
              maxEdits: 1,
            },
            tokenOrder: "sequential",
          },
        },
      },
      {
        $project: {
          _id: 1,
          videoId: 1,
          channelTitle: 1,
          publishTime: 1,
          title: 1,
          description: 1,
          thumbnails: 1,
          tag: 1,
          score: { $meta: "searchScore" },
        },
      },
    ]);
    console.log(result);
    size = result.length;
    return res.send({
      size,
      success: result,
    });
  } catch (error) {
    console.error(error);
    res.send([]);
  }
};
