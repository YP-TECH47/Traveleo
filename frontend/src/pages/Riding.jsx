import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
          <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
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
            <h2 className="text-lg font-medium capitalize">Yash</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              ZA-01-AE-0024{" "}
            </h4>
            <p className="text-sm font-semibold text-gray-600">
              Maruti Suzuki Alto
            </p>
            <h1 className="text-lg font-semibold"> 123456 </h1>
          </div>
        </div>

        <div className="flex gap-3 justify-between flex-col items-center p-2 ">
          <div className="w-full">
            <div className="flex items-center gap-5 p-2 border-b ">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  Rajapark Mall , Delhi
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹193.23 </h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
          <button className="w-full   bg-green-600 text-white font-semibold p-2 rounded-lg">
            Make A Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
