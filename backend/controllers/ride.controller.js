const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

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
    
} catch (err) {
    throw new Error("Error creating a ride")
    console.log(err)
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