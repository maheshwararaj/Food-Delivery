import React, { useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom';
export const Navbar = () => {


  const [menu,setMenu] = useState("home");
  return (
    <div className='navbar'>
        <img src={assets.logo} alt="logo" className="logo" />
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("home")} className={menu=== "home" ? "active":""}>Home</Link>
            <li onClick={()=>setMenu("menu")} className={menu=== "menu" ? "active":""}> <a href="#explore-menu">Menu</a></li>
            <li onClick={()=>setMenu("mobile-app")} className={menu=== "mobile-app" ? "active":""}><a href="#app-download">Mobile-app</a></li>
            <li onClick={()=>setMenu("contact-us")} className={menu=== "contact-us" ? "active":""}><a href='#footer'>Contact us</a></li>
        </ul>

        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
            <img src={assets.basket_icon} alt="" />
            <div className="dot"></div>
          </div>
          <button>sign in</button>
        </div>
    </div>
  )
}
