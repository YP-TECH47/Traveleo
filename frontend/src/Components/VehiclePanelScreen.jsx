import React from 'react'

const VehiclePanel = ({setVehiclePanel,setConfirmRidePanel,fare,setVehicleType}) => {


  if(!fare){
    return (
      <div className='flex items-center justify-center h-full'>
        <p className='text-lg font-semibold'>No fare information available.</p>
      </div>
    );
  }

  return (
    <div><div className="flex items-center justify-end ">
         <h5 
         onClick={()=>{setVehiclePanel(false)
         
         }}
         className="text-2xl  "><i className="ri-arrow-left-line"></i></h5>
       </div>
        <h3 className="font-bold ml-2 mb-2">Select Affordable Rides :</h3>

        <div onClick={()=>{setConfirmRidePanel(true)
            setVehiclePanel(false)
            setVehicleType('car')
        }} className=" flex items-center justify-between mb-3.5 border-white border-2 active:border-black p-2 rounded-2xl w-full ">
          <img
            className="h-10"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt=""
          />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-3-fill"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away </h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹ {fare.fare.car}</h2>
        </div>
        <div onClick={()=>{setConfirmRidePanel(true)
            setVehiclePanel(false)
            setVehicleType('moto')
        }} className=" flex items-center justify-between mb-3.5 border-white border-2 active:border-black p-2 rounded-2xl w-full ">
          <img
            className="h-16"
            src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Regular/MotorcycleOrange-249-0.png"
            alt=""
          />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              UberRide{" "}
              <span>
                <i className="ri-user-3-fill"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-sm">3 mins away </h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, Bike rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹ {fare.fare.moto}</h2>
        </div>
        <div onClick={()=>{setConfirmRidePanel(true)
            setVehiclePanel(false)
            setVehicleType('auto')
        }} className=" flex items-center justify-between mb-3.5 border-white border-2 active:border-black p-2 rounded-2xl w-full ">
          <img
            className="h-10"
            src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpgNht7VitzP0RI3iGs3VHKjA3VL7OPTDBe6aEn8ijpA&s"
            alt=""
          />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              UberAuto{" "}
              <span>
                <i className="ri-user-3-fill"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-sm">3 mins away </h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, auto rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹ {fare.fare.auto}</h2>
        </div></div>
  )
}

export default VehiclePanel