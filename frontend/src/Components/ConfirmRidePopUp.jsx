import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  const submitHandeler = (e) => {
    e.preventDefault();
    if (OTP === "123456") {
      navigate("/captain-riding");
    } else {
      alert("Invalid OTP");
    }
  };
  return (
    <div className="h-screen pt-20 ">
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setConfirmRidePopUpPanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-2 ">
        Confirm Acceptance of Ride ?
      </h3>
      <div className="flex justify-between items-center  bg-amber-400 p-2 rounded-lg">
        <div className="flex  items-center">
          <img
            className="h-14 w-14 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRexGFXR6G6MTBH2cyIOVrf4QoZoEt9TrB9_jVwDC2kWA&s=10"
            alt="User Image"
          />
          <p className="font-semibold text-lg ml-2">Harshii Pateliya</p>
        </div>

        <p className="font-semibold text-lg">2.2 KM</p>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Malvia Nagar, Sector 11 1/662
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Fortis Hospital: Jawahar Lal Nehru Marg
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹193.50</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <form onSubmit={submitHandeler}>
            <input
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              type="number"
              placeholder="Enter OTP"
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            />
            <button className="w-full flex justify-center  bg-green-600 text-white font-semibold p-2 rounded-lg mb-2">
              Agree
            </button>
          </form>
          <button
            onClick={() => {
              props.setConfirmRidePopUpPanel(false);
            }}
            className="w-full bg-gray-400 text-white font-semibold p-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
