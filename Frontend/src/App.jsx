import React, { useState } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import Footer from './components/Footer/Footer'
import './App.css'
import Goup from './components/Goup/Goup'
import Loginpopup from './components/Loginpopup/Loginpopup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from './pages/Orders/MyOrders'
import ProductDetail from './pages/ProductDetail'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)


  return (
  <>
    <ToastContainer/>
    {showLogin?<Loginpopup setShowLogin={setShowLogin}/>:""}

    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/order' element={<Placeorder/>}/>
        <Route path='/myorders' element={<MyOrders />} />
        <Route path='/product/:id' element={<ProductDetail/>} />
      </Routes>
  
    </div>
    <Footer/>
    <Goup/>
    </>     
  )
}

export default App