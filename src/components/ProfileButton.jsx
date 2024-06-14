import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  import React from 'react'
import { Link } from "react-router-dom"
  
  function ProfileButton({userData}) {
    return (
      <div>
        <DropdownMenu>
  <DropdownMenuTrigger>
    
    <img src={userData.userData.avatar} alt={userData.userData.username} className="h-9 w-9 rounded-full"/>
  </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white bg-opacity-90 backdrop-blur-lg">
            <DropdownMenuLabel>{userData.userData.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>
                    <Link to={"/dashboard"}>Dashboard</Link>
                </DropdownMenuLabel>
                <DropdownMenuLabel>
                    
                <Link to={"/channelPage"}>Channel Page</Link>
                </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>

      </div>
    )
  }
  
  export default ProfileButton