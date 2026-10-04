const mapsServices = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const address = req.query.address;
    const coordinates = await mapsServices.getAddressCoordinate(address);

    res.status(200).json(coordinates);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Internal server error",
    });
  }
};
module.exports.getDistanceAndTime = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { origin, destination } = req.query;
    const distanceTime = await mapsServices.getDistanceAndTime(
      origin,
      destination,
    );

    res.status(200).json(distanceTime);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports.getSuggestions = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { input } = req.query;
    const suggestions = await mapsServices.getAutoCompleteSuggestions(input);
    res.status(200).json(suggestions);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
