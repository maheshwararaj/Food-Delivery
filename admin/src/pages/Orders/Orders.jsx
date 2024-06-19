import React from 'react'
import './Orders.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
const Orders = ({url}) => {
  
  const [orderList,setOrderList]=useState([])
  const fetchList = async ()=>{
    const response = await axios.get("http://localhost:4000/api/order/adminOrders")
    if(response.data.success)
      setOrderList(response.data.orders)
    console.log(response.data.orders)
  }
  const onChangeHandler = async (event,orderId)=>{
   
    const orderStatus = event.target.value;
    const response = await axios.post(url+"/api/order/update",{orderId,orderStatus})
   
  }
  useEffect(()=>{
    fetchList()
  },[])
  return (
    <div className='orders add '>  
    <p>All Orders</p>
        <div className="orders-container">
            {orderList.map((item,index)=>{
              return(
                <div className="order-item" key={index}>
                    <div className="order-details">
                      <p>orderId #{item._id}</p>
                      <p>Date & Time {item.date}</p>
                      <p>Status &nbsp;
                        <select onChange={(e)=>onChangeHandler(e,item._id)}  name="process" id="">
                          <option value="In Process">In Process</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                          
                         </p>
                      <p>Total ${item.amount}</p>
                    </div>
                    <h3>Products</h3>
                    <div className="item-details flex-col">
                      {item.items.map((indItem,index)=>{
                        return(
                            <div className="ind-item" key={index}>
                               <img src={`${url}/images/${indItem.image}`} alt="" />  
                                <p>{indItem.name}</p>
                                <p>{indItem.quantity}</p>
                                <p>$ {indItem.price}</p>
                                <p>Total ${indItem.price * indItem.quantity}</p>
                            </div>
                        )
                      })}
                    </div>
                    <h3>Customer Details</h3>
                    <div className="user-address-container">
                      
                      <div className="user-details">
                        <p>Id : {item.userId}</p>
                        <p>Name : {item.address.firstname} {item.address.lastname}</p>
                        <p>Phone : {item.address.phone}</p>
                      </div>
                      <div className="address-details">
                      <p>{item.address.street} {item.address.area}</p>
                        <p>{item.address.city} {item.address.state}</p>
                        <p>{item.address.country} {item.address.pincode}</p>  
                      </div> 
                    </div>
                </div>
              );
            })}
        </div>
    </div>
  )
}

export default Orders