import React from 'react'
import {Link} from 'react-router-dom'

const Start = () => {
  return (
   <>
   <div className=" h-screen flex flex-col w-full relative  ">
<img className='w-25 h-16 absolute invert m-4' src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzhGbTh4cU5SZGZUVjUxYVh3bnEyLnN2ZyJ9:weare:F1cOF9Bps96cMy7r9Y2d7affBYsDeiDoIHfqZrbcxAw?width=1200&height=417" alt="uber Image" />
    <div className="main-img h-[80%] w-full">

      <img className='h-full w-full' src="https://images.unsplash.com/photo-1557404763-69708cd8b9ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYWZmaWMlMjBsaXNndCUyMHJlYWxhc3RpYyUyMGltZ3xlbnwwfHwwfHx8MA%3D%3D" alt="Traffic light image" />
    </div>
 <div className="bg-white pb-8 py-4 px-4">
    <p className='font-bold text-3xl flex justify-center pt-2 mb-1.5'>Get started with Uber</p>
    <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>

  </div>   

   </div>
   
   </>
  )
}

export default Start
