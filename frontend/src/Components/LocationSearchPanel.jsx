import React from "react";
import "remixicon/fonts/remixicon.css";

const LocationSearchPanel = ({ setVehiclePanel,setPanel,suggestions,ActiveFeild,setpick_up,setdestination }) => {
 
  const locations = [
    "Fortis Hospital: Jawahar Lal Nehru Marg, Malviya Nagar",
    "Flat 402, Block B, Amrapali Marg, Nityanand Nagar, Vaishali Nagar, Jaipur, Rajasthan",
    "Jawahar Lal Nehru Marg, D-Block, Crystal Court, Malviya Nagar, Jaipur, Rajasthan 302017",
    "Pink Square,Plot No. 1 & 2 on Govind Marg in Saket Colony, Adarsh Nagar, Jaipur, Rajasthan",
  ];// temp data until backend development 

const tempSetter = (value) => {
  if (ActiveFeild === 'pickup') {
    setpick_up(value);
  } else if (ActiveFeild === 'destination') {
    setdestination(value);
  }

  console.log("Selected value:", value);
};

   const handleSuggestionClick = (suggestion) => {
        if (ActiveFeild === 'pickup') {
            setpick_up(suggestion)
        } else if (ActiveFeild === 'destination') {
            setdestination(suggestion)
        }
         
    }

// add the suggestions to the map function after integrating the backend to frontend and add the onClick event to the div to set the pick_up and destination values based on the ActiveFeild state.

  return (
    <div>
      {locations.map((e, i) => {
        return (
            <div key={i} onClick={() => tempSetter(e)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-6 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{e}</h4>
                    </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
 