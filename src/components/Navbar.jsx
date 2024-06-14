import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { logoutUser } from "../api/api";
import { Link } from "react-router-dom";
import { Upload } from "lucide-react";
import ProfileButton from "./ProfileButton";

function Navbar() {
  const { userData, status } = useSelector((state) => state.auth);
  // console.log("storedUserdata", userData, status);
  const dispatch = useDispatch();

  const logmeOut = async () => {
    try {
      const loggedOut = await logoutUser();
      if (loggedOut) {
        console.log(loggedOut.data.message);
        dispatch(logout());
        localStorage.clear();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-2xl">
            Video App
          </Link>
          <div>
            {status ? (
              <div className="flex items-center gap-4">
                {/* <h1 className='text-white mr-4'>{userData.userData.username}</h1> */}
                {/* <img src={userData.userData.avatar} alt={userData.userData.username} className="h-9 w-9 rounded-full"/> */}
                <ProfileButton userData={userData} />
                <Link
                  to={"/uploadVideo"}
                  className="rounded-full bg-yellow-100 p-[5px]"
                >
                  <Upload />
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={logmeOut}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link to="/login" className="text-white mr-4">
                  Login
                </Link>
                <Link to="/register" className="text-white">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
