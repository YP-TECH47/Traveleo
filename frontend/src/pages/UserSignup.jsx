import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'


const UserSignup = () => {


  const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const [firstname, setFirstname] = useState();
   const [lastname, setLastname] = useState();
   const navigate = useNavigate()
   const {User,setUser}=React.useContext(UserDataContext)
 

  




  const submitHandler = async (e)=>{
e.preventDefault()
 let UserSignupData ={
     fullname:{
      firstname:firstname,
      lastname:lastname
    },
    email:email,
    password:password
   };
   setEmail("")
   setFirstname("")
   setLastname("")
   setPassword("")

   let response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,UserSignupData);
   if(response.status=="201"){
    let data = response.data;
    setUser(data.user)
    localStorage.setItem('token',data.token)
    navigate('/home')
   }
    
   


  }
  return (
   <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16  mb-3' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
   <h3 className='text-lg font-medium mb-2'>Enter your Name</h3>
          <div className='flex  justify-around items-center w-full gap-2'>
            
      

          <input
            required
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-[50%] text-lg placeholder:text-base'
            type="text"
            placeholder='Enter Firstname'
           
          />
              <input
            
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-[50%] text-lg placeholder:text-base'
            type="text"
             placeholder='Enter Lastname'
          />
          </div>

          <h3 className='text-lg font-medium mb-2'>Enter your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='example@email.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='Password'
          />

          <button

            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Signup</button>

        </form>
        <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link></p>
      </div>
      <div>
        <Link
          to='/captain-signup'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign up as Captain</Link>
      </div>
    </div>
  )
}

export default UserSignup
