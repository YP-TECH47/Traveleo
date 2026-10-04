import React from "react";
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

  // backend intergration module
  const [PickupSuggestions, setPickupSuggestions] = useState([]);
  const [DestinationSuggestions, setDestinationSuggestions] = useState([]);
  const [ActiveFeild, setActiveFeild] = useState(null);
  const [Fare, setFare] = useState(null);
  const [VehicleType, setVehicleType] = useState(null);

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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      // const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
      //   params: { input: e.target.value },
      //               headers: {
      //                   Authorization: `Bearer ${localStorage.getItem('token')}`
      //               }
      // });
      // setPickupSuggestions(response.data)
    } catch (err) {
      console.log(err);
    }
  }

  async function handelDestinationSuggestions(e) {
    setdestination(e.target.value);

    try {
      // const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
      //   params: { input: e.target.value },
      //               headers: {
      //                   Authorization: `Bearer ${localStorage.getItem('token')}`
      //               }
      // });
      // setDestinationSuggestions(response.data)
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
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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

  useGSAP(
    function () {
      if (ConfirmRidePanel) {
        gsap.to(ConfirmRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ConfirmRideRef.current, {
          transform: "translateY(100%)",
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
        });
      } else {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(100%)",
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
          zIndex: -1,
        });
      } else {
        gsap.to(VehicleFoundRef.current, {
          transform: "translateY(300%)",
          zIndex: -1,
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
        });
      } else {
        gsap.to(VechielpanelRef.current, {
          transform: "translateY(100%)",
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
        <img
          className="h-[70%] w-full"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber map"
        />
      </div>

      <div className="  h-screen absolute flex flex-col justify-end bottom-0 w-full ">
        <div className="bg-white p-5   h-[30%] relative">
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
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          pickup={pick_up}
          destination={destination}
          vehicleType={VehicleType}
          fare={Fare}
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
        <WaitingForDriver />
      </div>
    </div>
  );
};

export default Home;
