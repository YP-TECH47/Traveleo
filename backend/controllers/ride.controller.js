const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const {sendMessageToSocketId} = require("../Socket")

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

    captainsInRadius.map((captain)=>{

      sendMessageToSocketId(captain.socketId, { event: "new-ride", data: ride });
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