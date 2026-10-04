 
import './App.css'
import {Routes,  Route } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import {UserDataContext} from './context/UserContext'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
 

function App() {


    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  if (!isMobile) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-purple-600 z-50 flex items-center justify-center p-4">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl max-w-md w-full p-8 text-center">
          <div className="text-6xl mb-5">📱</div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Mobile Device Required
          </h2>

          <p className="text-white/80 text-lg mb-6">
            This application is exclusively designed for mobile devices.
            Please open it on your smartphone for the best experience.
          </p>

          <div className="text-white/70 text-sm">
            Supported screen width: Below 768px
          </div>
        </div>
      </div>
    )
  }
   

  return (
   
   
     <div  >
               <Routes>
                <Route path='/' element={<Start/>}/> 
                <Route path='/login' element={<UserLogin/>}/> 
                <Route path='/SignUp' element={<UserSignup/>}/> 
                <Route path='/captain-signup' element={<CaptainSignup/>}/> 
                <Route path='/captain-login' element={<CaptainLogin/>}/> 
                <Route path='/home' element={
                  <UserProtectWrapper>
                     <Home/>
                  </UserProtectWrapper>
                }/> 
                <Route path='/user/logout' element={
                  <UserProtectWrapper>
                     <UserLogout/>
                  </UserProtectWrapper>
                }/> 
                 <Route path='/captain-home' element={
                  <CaptainProtectWrapper>
                     <CaptainHome/>
                  </CaptainProtectWrapper>
                 }/> 
                 <Route path='/captain-riding' element={
                  <CaptainProtectWrapper>
                     <CaptainRiding/>
                  </CaptainProtectWrapper>
                 }/> 
                 <Route path='/Riding' element={
                  <UserProtectWrapper>
                     <Riding/>
                  </UserProtectWrapper>
                 }/> 
                  <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />

               </Routes>
     </div>
     
     
  )
}

export default App
