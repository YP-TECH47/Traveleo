import React from 'react'

const CaptainDetails = () => {
  return (
    <>
  
    <div className="flex justify-between items-center p-2 ">
  <div  className="  p-2 flex ">
<div className="">
<img className="h-14 w-14 rounded-full  ml-2 bg-cover  " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtDj_cGet1q8yfhd2jxAZ11TgG4ejdOBRA7iJMyof2bg&s=10"  alt="Uber Driver Image" />
</div>

<div className="flex flex-col  justify-center ml-3">
  <p className="font-bold">Harshal Patel</p>
</div>


</div>


<div  className="flex flex-col items-center mr-2">
<p className="font-semibold text-xl mr-1">₹250.30</p>
<div>
  <p className="font-semibold text-sm">Earned</p>
</div>
  </div>  
</div>

<div className="flex justify-around items-center p-2 ">
<div className="flex flex-col justify-center items-center">
  <i className="ri-dashboard-2-line text-2xl"></i>
  <p className="font-semibold text-xl">10.2</p>
  <p className="  text-lg">Hours online</p>

</div>
<div className="flex flex-col justify-center items-center">
  <i className="ri-dashboard-2-line text-2xl"></i>
  <p className="font-semibold text-xl">10.2</p>
  <p className="  text-lg">Hours online</p>

</div>
<div className="flex flex-col justify-center items-center">
  <i className="ri-dashboard-2-line text-2xl"></i>
  <p className="font-semibold text-xl">10.2</p>
  <p className="  text-lg">Hours online</p>

</div>
</div>
  </>
  )
}

export default CaptainDetails