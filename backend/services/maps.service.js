const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;

      return {
        lat: location.lat,
        lng: location.lng,
      };
    }

    throw new Error(`Google Maps API Error: ${response.data.status}`);
  } catch (error) {
    console.error("Maps Error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("origin and destinations are required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }

      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    console.log(err);
    throw err;
  }
};
module.exports.getAutoCompleteSuggestions = async (input) => {
  if(!input || input.trim() === ""){
    throw new Error("Input is required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&components=country:in&key=${apiKey}
`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions
        .map((predictions) => predictions.description)
        .filter((value) => value);
    } else {
      throw new Error("Unable to fetch Coordinates");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
