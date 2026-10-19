import React, { useState, useRef, useContext,useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import CaptainDetails from "../Components/CaptainDetails";
import RidePopUp from "../Components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp";
import {SocketContext} from "../context/SocketContext"
import {CaptainDataContext } from "../context/CaptainContext"
import axios from "axios";
import LiveTracking from "../Components/LiveTracking";
import { useNavigate } from "react-router-dom";

const CaptainHome = () => {
  const [RidePopUpPanel, setRidePopUpPanel] = useState(false);
  const RidePopUpPanelRef = useRef(null);
  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const ConfirmRidePopUpPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  // socket.io intregration module
  const {socket} = useContext(SocketContext)
  const {captain} = useContext(CaptainDataContext)



const navigate = useNavigate();
  useEffect(() => {
    if (!captain) return;
    socket.emit('join',{userType:"captain", userId:captain._id})
  

      const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()
    
  }, [captain])
  
  socket.on('new-ride', (data) => {
    setRide(data)
    setRidePopUpPanel(true)
    console.log(ride)
   
  })

  useGSAP(
    function () {
      if (RidePopUpPanel) {
        gsap.to(RidePopUpPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(RidePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [RidePopUpPanel],
  );
  useGSAP(
    function () {
      if (ConfirmRidePopUpPanel) {
        gsap.to(ConfirmRidePopUpPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ConfirmRidePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ConfirmRidePopUpPanel],
  );




   async function confirmRide() {
    try {
      console.log("in the confirmride function")
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('captain-token')}`// we will take the token from local storage in development and in production we will take it from the cookie
            }
        })
console.log("exiting the confirmride function")
        setRidePopUpPanel(false)
        setConfirmRidePopUpPanel(true)
    } catch (error) {
      console.log(error);
    }

  

    }
  return (
    <div className=" relative h-screen w-screen ">
      <img
        className="w-16  absolute invert left-5 top-5"
        src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzhGbTh4cU5SZGZUVjUxYVh3bnEyLnN2ZyJ9:weare:F1cOF9Bps96cMy7r9Y2d7affBYsDeiDoIHfqZrbcxAw?width=1200&height=417"
        alt="uber Image"
      />
{!RidePopUpPanel && !ConfirmRidePopUpPanel && (
  <button
    onClick={() => navigate("/captain-profile")}
    aria-label="Open captain profile"
    className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md"
  >
    <i className="ri-user-line text-2xl text-black"></i>
  </button>
)}
      <div className="h-[65%]">
       <LiveTracking/>
      </div>
      <div className=" h-[35%] ">
        <CaptainDetails />
      </div>
      <div
        ref={RidePopUpPanelRef}
        className="fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12 "
      >
        <RidePopUp
          RidePopUpPanel={RidePopUpPanel}
confirmRide={confirmRide}
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
      <div
        ref={ConfirmRidePopUpPanelRef}
        className="fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12 "
      >
        <ConfirmRidePopUp
        ride={ride}
          ConfirmRidePopUpPanel={ConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
