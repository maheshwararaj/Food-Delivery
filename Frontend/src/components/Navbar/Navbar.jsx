import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { Storecontext } from '../../context/Storecontext';

export const Navbar = ({setShowLogin}) => {

  const {getTotalItemsInCart,token,setToken} = useContext(Storecontext)
  const [menu,setMenu] = useState("home");
  const navigate = useNavigate()
  const logout = ()=>{
    localStorage.removeItem("token")
    setToken("")
    navigate('/')
  }
  return (
    <div className='navbar'>
        <Link to={'/'}><img src={assets.logo} alt="logo" className="logo" /></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("home")} className={menu=== "home" ? "active":""}>Home</Link>
            <li onClick={()=>setMenu("menu")} className={menu=== "menu" ? "active":""}> <a href="#explore-menu">Menu</a></li>
            <li onClick={()=>setMenu("mobile-app")} className={menu=== "mobile-app" ? "active":""}><a href="#app-download">Mobile-app</a></li>
            <li onClick={()=>setMenu("contact-us")} className={menu=== "contact-us" ? "active":""}><a href='#footer'>Contact us</a></li>
        </ul>

        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
            <Link to={'/Cart'}><img src={assets.basket_icon} alt="" /></Link>
           
            <div className={getTotalItemsInCart()>0?"dot":""}></div>
          </div>
          {!token? <button onClick={() => setShowLogin(true)}>sign in</button> 
          : <div className="nav-profile">
            <img src={assets.profile} alt="profile" />
            <div className="nav-profile-dropdown">
              <Link to={'/myorders'} className='nav-profile-link'><img src={assets.bag_icon} alt="orders" /><p>Orders</p></Link>
              <hr />
              <li onClick={logout}><img  src={assets.logout_icon} alt="logout" /><p>Logout</p></li>
            </div>
          </div> }
          
        </div>
    </div>
  )
}
