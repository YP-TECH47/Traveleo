import React,{useContext} from "react";

import {CaptainDataContext} from "../context/CaptainContext"

const CaptainDetails = () => {
  const {captain} = React.useContext(CaptainDataContext);
  
  return (
    <>
      <div className="flex justify-between items-center p-2 ">
        <div className="  p-2 flex ">
          <div className="">
            <img
              className="h-14 w-14 rounded-full  ml-2 bg-cover  "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtDj_cGet1q8yfhd2jxAZ11TgG4ejdOBRA7iJMyof2bg&s=10"
              alt="Uber Driver Image"
            />
          </div>

          <div className="flex flex-col  justify-center ml-3">
            <p className="font-bold">{captain?.fullname.firstname+ " " + captain?.fullname.lastname}</p>
          </div>
        </div>

        <div className="flex flex-col items-center mr-2">
          <p className="font-semibold text-xl mr-1">₹250.30</p>
          <div>
            <p className="font-semibold text-sm">Earned</p>
          </div>
        </div>
      </div>

      <div className="flex justify-around items-center p-2 ">
        <div className="flex flex-col justify-center items-center">
          <i className="ri-car-fill text-2xl"></i>
          <p className="  text-lg">Vehicle</p>
          <p className="font-semibold text-xl capitalize">{captain?.vehicle.vehicleType}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <i className="ri-sofa-fill text-2xl"></i>
          <p className="  text-lg">Capacity</p>
          <p className="font-semibold text-xl">{captain?.vehicle.capacity}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <i className="ri-bar-chart-fill text-2xl"></i>
          <p className="  text-lg">Status</p>
          <p className="font-semibold text-xl capitalize">{captain?.status}</p>
        </div>
      </div>
    </>
  );
};

export default CaptainDetails;
