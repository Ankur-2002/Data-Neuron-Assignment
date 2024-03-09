const countApiModel = require('../../models/API_LIMIT');

const countApi = async (req, res, next) => {
  try {
    const path = req.originalUrl;
    const api = await countApiModel.findOne({
      api: path,
    });

    if (api) {
      await countApiModel.updateOne(
        {
          api: path,
        },
        {
          $inc: {
            count: 1,
          },
        },
      );
    } else {
      const newApi = new countApiModel({
        api: path,
        count: 1,
      });
      await newApi.save();
    }

    next();
  } catch (err) {}
};

module.exports = countApi;
