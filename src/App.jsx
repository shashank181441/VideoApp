import React, { useEffect, useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VideoPage from './pages/VideoPage'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from './api/api'
import { login, logout } from './store/authSlice'
import Navbar from './components/Navbar'
import UploadVideo from './pages/UploadVideo'

function App() {
  const [userData, setUserData]= useState({})
  const storeUserData = useSelector(state=>state.auth.userData)
  const [loading ,setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(()=>{
    getCurrentUser()
    .then((userData)=>{
      console.log(userData);
      if (userData) {
        setUserData(userData.data.data)
        dispatch(login({userData: userData.data.data}))
      }else{
        dispatch(logout)
      }
    })
    .finally(()=>setLoading(false))
  },[])
  return (
    
    <div>
      {/* <Login /> */}
      {/* <h1 className="text-red-500 text-3xl">Hello world</h1> */}
      {/* <Register /> */}
      {/* <Login /> */}

      <BrowserRouter>
      <Navbar />
        <Routes>
          {/* <Route path="/" element={<SharedLayout />}> */}
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path={`/videoPage/:videoId`} element={<VideoPage />}/>
            <Route path="/uploadVideo" element={<UploadVideo/> }/>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App