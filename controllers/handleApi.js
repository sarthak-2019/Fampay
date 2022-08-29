/* eslint-disable */
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No Video found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    if ("tag" in queryObj && queryObj.tag === "all") delete queryObj.tag;

    var totalDocuments = await Model.find(queryObj).countDocuments();

    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      total_length: totalDocuments,
      data: {
        data: doc,
      },
    });
  });
