const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const {sendMessageToSocketId} = require("../Socket")
const rideModel = require("../models/ride.model");


module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const {userId,pickup,destination,vehicleType} = req.body;
try {
    const ride = await rideService.createRide({user:req.user._id,pickup,destination,vehicleType})

    
    res.status(200).json({
        message:"Ride Created Sucessfully",
        ride
    })
const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
console.log(pickupCoordinates)
    const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,2)
    console.log("Captains in radius",captainsInRadius)

    ride.otp= null;
const rideWithPopulatedUser = await rideModel.findOne({ _id: ride._id }).populate("user");
    captainsInRadius.map((captain)=>{

      sendMessageToSocketId(captain.socketId, { event: "new-ride", data: rideWithPopulatedUser });
    })
} catch (err) {
  console.log(err)
    throw new Error("Error creating a ride")
     
}
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const {destination,pickup}=req.query;
const fare = await rideService.getFare(pickup,destination);

return res.status(200).json({
  fare
});

}

module.exports.confirmRide=async(req,res)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }


  try {

    const {rideId}= req.body;
    console.log("Captain from auth middleware:", req.captain);
     const ride = await rideService.confirmRide({ rideId, captain: req.captain });
console.log("ride confirmed")
      sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
     res.status(200).json(
      ride
     );
  } catch (err) {
    console.log(err)
    throw new Error("Error while confirming a ride")
  }
}



module.exports.startRide=async (req,res,next)=>{
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  try {
    const {rideId,otp}= req.query;
    const ride = await rideService.startRide({rideId,otp,captain:req.captain})
 sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        res.status(200).json(ride)
  } catch (error) {
    console.log(error)
    throw new Error("Problem while starting ride")
  }
}