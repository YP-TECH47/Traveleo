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

const CaptainHome = () => {
  const [RidePopUpPanel, setRidePopUpPanel] = useState(false);
  const RidePopUpPanelRef = useRef(null);
  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const ConfirmRidePopUpPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  // socket.io intregration module
  const {socket} = useContext(SocketContext)
  const {captain} = useContext(CaptainDataContext)




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
                Authorization: `Bearer ${localStorage.getItem('captain-token')}`
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

      <div className="h-[65%]">
        <img
          className=" h-full w-full"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber map"
        />
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
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
