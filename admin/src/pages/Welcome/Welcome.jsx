import React, { useContext } from 'react'
import './Welcome.css'
import {assets} from '../../assets/assets.js'
import { AdminContext } from '../../Context/AdminContext.jsx'
const Welcome = () => {
    const {userCount,foodCount} = useContext(AdminContext)

   
  return (
 
    <div className='welcome add'>
        <h1>Welcome Back Admin!</h1>
        <div className="analysis">
            <div className="customers box">
                <div className="text-desc flex">
                    <p>Total <br /> Customers</p>
                    <h3>{userCount}</h3>
                </div>
                <img src={assets.customer} alt="" />
            </div>
            <div className="products box">
                <div className="text-desc">
                    <p>Total <br /> Products</p>
                    <h3>{foodCount}</h3>
                </div>
                <img src={assets.product} alt="" />
            </div>
            <div className="revenue box">
                <div className="text-desc">
                    <p>Total <br/> Revenue</p>
                    <h3>$8788</h3>
                </div>
                <img src={assets.revenue} alt="" />
            </div>
            <div className="orders box">
            <div className="text-desc">
                    <p>Pending <br /> Orders</p>
                    <h3>1,534</h3>
                </div>
                <img src={assets.pending} alt="" />
            </div>
        </div>
    </div>

  )
}

export default Welcome