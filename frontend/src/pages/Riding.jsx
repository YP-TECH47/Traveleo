import React, { useContext } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import {SocketContext} from "../context/SocketContext"

const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const {socket}= useContext(SocketContext)
  const navigate = useNavigate()
  
   socket.on("ride-ended", () => {
        navigate('/home')
    })

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="ri-home-2-fill "></i>
      </Link>
      <img
        className="h-1/2  w-full"
        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        alt="uber map"
      />
      <div className="h-1/2">
        <div className="flex items-center justify-between p-2">
          <img
            className="h-16"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt=""
          />
          <div className="  p-2 flex flex-col justify-around items-end">
            <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname.firstname}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain.vehicle.plate}{" "}
            </h4>
            <p className="text-sm font-semibold text-gray-600 capitalize">
              {ride?.captain.vehicle.color}
            </p>
            <h1 className="text-lg font-semibold"> {ride?.otp} </h1>
          </div>
        </div>

        <div className="flex gap-3 justify-between flex-col items-center p-2 ">
          <div className="w-full">
            <div className="flex items-center gap-5 p-2 border-b ">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">Heading Towards :</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {ride?.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">{ride?.fare} </h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
          <button onClick={()=>alert(" Please confirm the payment to the driver")} className="w-full   bg-green-600 text-white font-semibold p-2 rounded-lg">
            Make A Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
