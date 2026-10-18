const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("pickup annd destination is required");
  }

  const distanceTime = await mapService.getDistanceAndTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto,
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car,
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto,
    ),
  };

  return fare;
}

function getOTP(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.getFare = getFare;

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("user, pickup, destination and vehicleType are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    otp: getOTP(6),
    destination,
    fare: fare[vehicleType],
  });

  return ride;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride Id is required");
  }
  if (!captain || !captain._id) {
    throw new Error("Valid captain is required");
  }

  try {
    await rideModel.findOneAndUpdate(
      {
        _id: rideId,
      },
      {
        status: "accepted",
        captain: captain._id,
      },
    );

    const ride = await rideModel
      .findOne({
        _id: rideId,
      })
      .populate("user")
      .populate("captain")
      .select("+otp");

    if (!ride) {
      throw new Error("Ride not Found");
    }

    return ride;
  } catch (err) {
    console.log(err);
    throw new Error("Error while finding ride!");
  }
};
module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }
  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    },
  );
  return ride;
};
