import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './api/api';
import { login, logout } from './store/authSlice';
import { Loader } from 'lucide-react';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import VideoPage from './pages/VideoPage';
import Navbar from './components/Navbar';
import UploadVideo from './pages/UploadVideo';
import Dashboard from './pages/Dashboard';
import ChannelPage from './pages/ChannelPage';
import WatchHistory from './pages/WatchHistory';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  const [userData, setUserData] = useState({});
  const { status } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        if (userData) {
          setUserData(userData.data.data);
          dispatch(login({ userData: userData.data.data }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

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
      <BrowserRouter>
        <Navbar />
        <Routes>

        <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/" element={<Home />} />
          <Route path="/videoPage/:videoId" element={<VideoPage />} /> */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/videoPage/:videoId"
            element={
              <ProtectedRoute>
                <VideoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/uploadVideo"
            element={
              <ProtectedRoute>
                <UploadVideo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/channelPage/:channelId"
            element={
              <ProtectedRoute>
                <ChannelPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchHistory"
            element={
              <ProtectedRoute>
                <WatchHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
