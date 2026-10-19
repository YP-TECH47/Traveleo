import React, { useContext,useEffect } from "react";
import axios from "axios";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanelScreen from "../Components/VehiclePanelScreen";
import ConfirmRide from "../Components/ConfirmRide";
import LookingForDriver from "../Components/LookingForDriver";
import WaitingForDriver from "../Components/WaitingForDriver";
import {SocketContext} from "../context/SocketContext"
import { UserDataContext } from "../context/UserContext";
import {useNavigate} from "react-router-dom"
import LiveTracking from "../Components/LiveTracking";

const Home = () => {
  const [pick_up, setpick_up] = useState("");
  const [destination, setdestination] = useState("");
  const [VehiclePanel, setVehiclePanel] = useState(false);
  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false);
  const [VehicleFound, setVehicleFound] = useState(false);
  const [WaitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [Panel, setPanel] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const VechielpanelRef = useRef(null);
  const ConfirmRideRef = useRef(null);
  const VehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);
// socket.io intregration module
const {socket} = useContext(SocketContext)
const {User}= useContext(UserDataContext)

  // backend intergration module
  const [PickupSuggestions, setPickupSuggestions] = useState([]);
  const [DestinationSuggestions, setDestinationSuggestions] = useState([]);
  const [ActiveFeild, setActiveFeild] = useState(null);
  const [Fare, setFare] = useState(null);
  const [VehicleType, setVehicleType] = useState(null);
  const [IsConfirmed, setIsConfirmed] = useState(false);
const [ride, setRide] = useState(null)
const navigate = useNavigate()


  useEffect(() => {
    if(!User) return;
   console.log(User)
    socket.emit("join", { userType: "user", userId: User._id })
  }, [User])
  
     socket.on('ride-confirmed', (ride) => {


       setVehicleFound(false)
        setWaitingForDriverPanel(true)
        setRide(ride)
         
    })

    socket.on('ride-started',ride=>{
      console.log("ride started event received"+ride)
      navigate("/riding", { state: { ride: ride } })

    })

  async function findTrip() {
    console.log(1);
    setVehiclePanel(true);
    console.log(2);
    setPanel(false);
    console.log(3);
    try {
      console.log(4);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: {
            destination: destination,
            pickup: pick_up,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,// we will take the token from local storage in development and in production we will take it from the cookie
          },
        },
      );
      console.log(5);
      setFare(response.data);
      console.log(Fare);
    } catch (error) {
      console.log(error);
    }
  }
  async function handelPickupSuggestions(e) {
    setpick_up(e.target.value);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
        params: { input: e.target.value },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`// we will take the token from local storage in development and in production we will take it from the cookie
                    }
      });
      setPickupSuggestions(response.data)
    } catch (err) {
      console.log(err);
    }
  }

  async function handelDestinationSuggestions(e) {
    setdestination(e.target.value);

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
        params: { input: e.target.value },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`// we will take the token from local storage in development and in production we will take it from the cookie
                    }
      });
      setDestinationSuggestions(response.data)
    } catch (err) {
      console.log(err);
    }
  }

  async function createRide() {

    
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup: pick_up,
        destination: destination,
        vehicleType: VehicleType,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },// we will take the token from local storage in development and in production we will take it from the cookie
      },
    );

    console.log(response.data);
  }
  useGSAP(
    function () {
      if (Panel) {
        gsap.to(panelRef.current, {
          height: "70%",
          // padding: "24px",
        });

        gsap.to(panelCloseRef.current, {
          opacity: "1",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          // padding: "0",
        });
        gsap.to(panelCloseRef.current, {
          opacity: "0",
        });
      }
    },
    [Panel],
  );
  console.log(Fare)

  useGSAP(
    function () {
      if (ConfirmRidePanel) {
        gsap.to(ConfirmRideRef.current, {
          transform: "translateY(0)",
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(ConfirmRideRef.current, {
          transform: "translateY(100%)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    },
    [ConfirmRidePanel],
  );
  useGSAP(
    function () {
      if (WaitingForDriverPanel) {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(0)",
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(100%)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    },
    [WaitingForDriverPanel],
  );
  useGSAP(
    function () {
      if (VehicleFound) {
        gsap.to(VehicleFoundRef.current, {
          transform: "translateY(0)",
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(VehicleFoundRef.current, {
          transform: "translateY(300%)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    },
    [VehicleFound],
  );
  useGSAP(
    function () {
      if (VehiclePanel) {
        gsap.to(VechielpanelRef.current, {
          transform: "translateY(0)",
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(VechielpanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    },
    [VehiclePanel],
  );

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="relative overflow-hidden">
      <img
        className="w-16  absolute invert left-5 top-5"
        src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzhGbTh4cU5SZGZUVjUxYVh3bnEyLnN2ZyJ9:weare:F1cOF9Bps96cMy7r9Y2d7affBYsDeiDoIHfqZrbcxAw?width=1200&height=417"
        alt="uber Image"
      />

      <div className="h-screen w-screen ">
      <LiveTracking/>
      </div>

      <div className="  h-screen absolute flex flex-col justify-end bottom-0 w-full ">
        <div className="bg-white p-5   h-[30%] relative">
        {!Panel &&
  !VehiclePanel &&
  !ConfirmRidePanel &&
  !VehicleFound &&
  !WaitingForDriverPanel && (
    <button
      onClick={() => navigate("/profile")}
      className="absolute top-5 right-5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md"
      aria-label="Open profile"
    >
      <i className="ri-user-line text-2xl text-black"></i>
    </button>
  )}
          <h5
            onClick={() => {
              setPanel(false);
            }}
            ref={panelCloseRef}
            className="absolute opacity-0 right-6 top-2 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
         
          <h3 className="text-2xl font-semibold">Find a Trip</h3>

          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-14 w-1  top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => {
                setPanel(true);
                setActiveFeild("pickup");
              }}
              type="text"
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
              placeholder="Enter pick-up location"
              value={pick_up}
              onChange={handelPickupSuggestions}
            />
            <input
              onClick={() => {
                setPanel(true);
                setActiveFeild("destination");
              }}
              type="text"
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
              placeholder="Enter your destination"
              value={destination}
              onChange={handelDestinationSuggestions}
            />
          </form>
          <button
            disabled={!pick_up || !destination}
            onClick={() => findTrip()}
            className="bg-black text-white md-2  px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white     ">
          <LocationSearchPanel
            setpick_up={setpick_up}
            setdestination={setdestination}
            suggestions={
              ActiveFeild === "pickup"
                ? PickupSuggestions
                : DestinationSuggestions
            }
            setVehiclePanel={setVehiclePanel}
            setPanel={setPanel}
            ActiveFeild={ActiveFeild}
          />
        </div>
      </div>

      <div
        ref={VechielpanelRef}
        className="fixed   z-10  bottom-0  bg-white w-full p-3  flex flex-col   "
      >
        <VehiclePanelScreen
          setIsConfirmed={setIsConfirmed}
          setVehicleType={setVehicleType}
          fare={Fare}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      <div
        ref={ConfirmRideRef}
        className="fixed   z-10  bottom-0  bg-white w-full p-3  flex flex-col   "
      >
        <ConfirmRide
          IsConfirmed={IsConfirmed}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          pickup={pick_up}
          destination={destination}
          vehicleType={VehicleType}
          fare={Fare}
          setWaitingForDriverPanel={setWaitingForDriverPanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={VehicleFoundRef}
        className="fixed   z-10  bottom-0  bg-white w-full p-3  flex flex-col   "
      >
        <LookingForDriver
          pickup={pick_up}
          destination={destination}
          vehicleType={VehicleType}
          fare={Fare}
          setWaitingForDriverPanel={setWaitingForDriverPanel}
          setVehicleFound={setVehicleFound}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      <div
        ref={WaitingForDriverRef}
        className="fixed   z-10  bottom-0  bg-white w-full p-3  flex flex-col   "
      >
        <WaitingForDriver
        ride={ride}
        setWaitingForDriverPanel={setWaitingForDriverPanel} />
      </div>
    </div>
  );
};

export default Home;
