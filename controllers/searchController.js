const VideoDataModel = require("./../models/videoDataModel");
const handleApi = require("./handleApi");

exports.getAllVideos = handleApi.getAll(VideoDataModel);

exports.getVideos = async (req, res) => {
  const queryObj = { ...req.query };
  let sort = -1;
  if (queryObj.sort === "publishTime") {
    sort = 1;
  }
  const page = queryObj.page * 1 || 1;
  const limit = queryObj.limit * 1 || 5;
  const keyWord = queryObj.word;
  const skip = (page - 1) * limit;
  if (!keyWord) {
    return res.status(400).json({
      status: "failure",
      message: "Please send keyword in the query",
    });
  }
  try {
    const result = await VideoDataModel.aggregate([
      {
        $search: {
          index: "autocomplete",
          autocomplete: {
            query: keyWord,
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
      { $sort: { publishTime: sort * 1 } },
      {
        $skip: skip,
      },
      {
        $limit: 5,
      },
    ]);
    const result1 = await VideoDataModel.aggregate([
      {
        $search: {
          index: "autocomplete",
          autocomplete: {
            query: queryObj.word,
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
    return res.status(200).json({
      status: "success",
      results: result.length,
      total_length: result1.length,
      data: {
        data: result,
      },
    });
  } catch (error) {
    console.error(error);
    res.send([]);
  }
};
