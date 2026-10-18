
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

const UserProfile = () => {
  const navigate = useNavigate();
const { User } = useContext(UserDataContext);
console.log(User)
  const handleLogout = () => {
   
    navigate("/user/logout");
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
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-black text-3xl font-bold text-white">
            U
          </div>

          <h1 className="mt-4 text-2xl font-bold">{User?.fullname.firstname + " " + User?.fullname.lastname}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Traveleo User
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <h2 className="border-b pb-3 text-lg font-semibold">
            Personal Details
          </h2>

          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="mt-1 font-medium">{User?.fullname.firstname + " " + User?.fullname.lastname}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="mt-1 font-medium">{User?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="mt-1 font-medium">{User?.phone || "Not provided"}</p>
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

export default UserProfile;
