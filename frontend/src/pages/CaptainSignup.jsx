import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [Color, setColor] = useState(); // can also be a dropdown but relying on the text input
  const [Plate, setPlate] = useState();
  const [Capacity, setCapacity] = useState();
  const [Vehicletype, setVehicletype] = useState("auto"); // in dropdown of Car,Auto,Motorcycle
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();
  let CaptainSignupData = {
    fullname: {
      firstname: firstname,
      lastname: lastname,
    },
    email: email,
    password: password,
    vehicle: {
      color: Color,
      plate: Plate,
      capacity: Capacity,
      vehicleType: Vehicletype,
    },
  };
  let response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,CaptainSignupData);
   if(response.status=="201"){
    let data = response.data;
    setCaptain(data.captain)
    localStorage.setItem('captain-token',data.token)
    navigate('/captain-home')
   }
    







    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setColor("");
    setPlate("");
    setCapacity("");
    setVehicletype("auto")
    
  };

 


  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-18   "
src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Captain logo"
        />

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">Enter your Name</h3>
          <div className="flex  justify-around items-center w-full gap-2">
            <input
              required
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-[50%] text-lg placeholder:text-base"
              type="text"
              placeholder="Enter Firstname"
            />
            <input
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-[50%] text-lg placeholder:text-base"
              type="text"
              placeholder="Enter Lastname"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's our Captain's Email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="example@email.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="Password"
          />
          <h3 className="text-lg font-medium mb-2"> Vehicle Information</h3>
          <div className="flex justify-around w-full gap-2">
            <input
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              value={Plate}
              onChange={(e) => {
                setPlate(e.target.value);
              }}
              required
              type="text"
              placeholder="Enter Plate "
            />

            <input
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              value={Color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
              required
              type="text"
              placeholder="Enter Color "
            />
          </div>

          <div className="flex justify-around w-full gap-2">
            <input
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              value={Capacity}
              onChange={(e) => {
                setCapacity(e.target.value);
              }}
              required
              type="number"
              placeholder="Enter Capacity "
            />

            <select
              required
              
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              onChange={(e)=>{setVehicletype(e.target.value)
                // SetCapacity(e.target.value)
              }}
              value={Vehicletype}
            >
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>

            {/* 'car', 'motorcycle', 'auto' */}
          </div>
          <button
           
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Signup
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "} 
          <Link to="/captain-login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
      <div className="mt-4">
        <Link
          to="/signup"
          className="bg-[#3617be] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign up as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
