import React from 'react'
import './css/navbar.css'
import navLogo from '../assets/Admin_Assets/nav-logo.svg'
import navProfile from "../assets/Admin_Assets/nav-profile.svg"

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navLogo} className='nav-logo' alt="" />
        <img src={navProfile} className='nav-profile ' alt="" />
    </div>
  )
}

export default Navbar