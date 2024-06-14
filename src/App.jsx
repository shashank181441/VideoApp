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
import { Loader } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import ChannelPage from './pages/ChannelPage'
import WatchHistory from './pages/WatchHistory'

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
  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <Loader className="w-16 h-16 text-blue-500 animate-spin" />
                <h1 className="mt-4 text-xl font-semibold">Loading...</h1>
            </div>
        </div>
    );
}
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
            <Route path="/dashboard" element={<Dashboard/> }/>
            <Route path="/channelPage" element={<ChannelPage/> }/>
            <Route path="/watchHistory" element={<WatchHistory/> }/>
            <Route path="/channelPage/:channelId" element={<ChannelPage/> }/>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App