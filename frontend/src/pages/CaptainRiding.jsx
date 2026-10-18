import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRiding from "../Components/FinishRiding";
import { useState,useContext } from "react";
import LiveTracking from "../Components/LiveTracking";
 
const CaptainRiding = () => {
  const [FinishRidingPanel, setFinishRidingPanel] = useState(false);
  const FinishRidingPanelRef = useRef(null);
 
  const location = useLocation()
  const rideData = location.state?.ride;
 
  useGSAP(
    function () {
      if (FinishRidingPanel) {
        gsap.to(FinishRidingPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(FinishRidingPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [FinishRidingPanel],
  );

  return (
    <div className="h-screen">
      <div className="h-[80%]">
         <LiveTracking/>
      </div>
      <div
        className="h-[20%] bg-yellow-500 flex items-center justify-around p-4 relative"
        onClick={() => {
          setFinishRidingPanel(true);
        }}
      >
        <h5 className="p-1 text-center w-[93%] absolute top-0">
          <i className="text-3xl  ri-arrow-up-wide-line"></i>
        </h5>
        <h1 className=" text-xl font-bold">4 KM Away</h1>
        <button className="bg-green-500 text-white p-3 px-10 rounded-sm ">
          Complete Ride
        </button>
      </div>

      <div
        ref={FinishRidingPanelRef}
        className="fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12 "
      >
        <FinishRiding
        ride={rideData} setFinishRidingPanel={setFinishRidingPanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
