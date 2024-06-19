import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom';
import './index.css'
import List from './pages/List/List';
import Add from './pages/Add/Add';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from './pages/Users/Users';
import Welcome from './pages/Welcome/Welcome';


const App = () => {
  const url = "http://localhost:4000"
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar/>
     
      <div className="app-content">
        <Sidebar/>
        <Routes>
        <Route path="/" element = {<Welcome url = {url} />} />
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element ={<List url={url}/>} />
          <Route path="/orders" element = {<Orders url={url} />}/>
          <Route path="/users" element = {<Users url={url} />}/>
          
        </Routes>
      </div>
    </div>
  )
}

export default App