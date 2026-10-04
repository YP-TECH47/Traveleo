import React from "react";

const RidePopUp = (props) => {
  return (
    <div >
      <h5 className="p-1 text-center w-[93%] absolute top-0" onClick={() => {
        props.setRidePopUpPanel(false)
      }}>
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-2 "> New Ride Available!</h3>
      <div className="flex justify-between items-center border bg-amber-400 p-2 rounded-lg">
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
        <div className='flex items-center justify-around p-2 w-full gap-2'>

 <button
          onClick={() => {
              props.setRidePopUpPanel(false)
          }}
          className="w-full bg-gray-600 text-white font-semibold p-2 rounded-lg"
        >
          Ignore
        </button>
        
        <button
          onClick={() => {
          props.setConfirmRidePopUpPanel(true)
          props.setRidePopUpPanel(false)
          }}
          className="w-full  bg-green-600 text-white font-semibold p-2 rounded-lg"
        >
          Confirm
        </button>
       
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
