import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainProfile = () => {
  const navigate = useNavigate();
  const { captain } = useContext(CaptainDataContext);
  console.log(captain);
  const handleLogout = () => {
    navigate("/captain/logout");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-sm font-medium text-gray-600 hover:text-black"
        >
          ← Back
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-800 text-3xl font-bold text-white">
            C
          </div>

          <h1 className="mt-4 text-2xl font-bold">{captain?.fullname.firstname + " " + captain?.fullname.lastname}</h1>
          <p className="mt-1 text-sm text-gray-500">Traveleo Captain</p>
        </div>

        <div className="mt-8 space-y-5">
          <h2 className="border-b pb-3 text-lg font-semibold">
            Personal Details
          </h2>

          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="mt-1 font-medium">{captain?.fullname.firstname + " " + captain?.fullname.lastname}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="mt-1 font-medium">{captain?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="mt-1 font-medium">{captain?.phone || "Not provided"}</p>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          <h2 className="border-b pb-3 text-lg font-semibold">
            Vehicle Details
          </h2>

          <div>
            <p className="text-sm text-gray-500">Vehicle Type</p>
            <p className="mt-1 font-medium capitalize">{captain?.vehicle.vehicleType || "Not provided"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Vehicle Model</p>
            <p className="mt-1 font-medium">Maruti Suzuki Swift</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Vehicle Number</p>
            <p className="mt-1 font-medium">{captain?.vehicle.plate || "Not provided"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Vehicle Color</p>
            <p className="mt-1 font-medium capitalize">{captain?.vehicle.color || "Not provided"}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-9 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default CaptainProfile;
