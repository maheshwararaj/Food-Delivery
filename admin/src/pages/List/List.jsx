import React, { useContext, useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../Context/AdminContext'
const List = ({url}) => {

  
  const [list,setList] = useState([]);
  const {setFoodCount} = useContext(AdminContext)
 


  const fetchList = async () =>{
   
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data);
    if(response.data.success){
      setList ( response.data.data);
    }
    else{
      toast.error(response.data.success);
    }
  }

  const removeFood = async(FoodId) =>{
    const response = await axios.post(`${url}/api/food/remove`,{id:FoodId})
    await fetchList();
    console.log(response);
    if(response.data.success){
    toast.success("Food Removed")
    setFoodCount(foodCount => foodCount-1)
    }
    else toast.error("Error in removing")
  }
  
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className="list add flex-col">
      <p>All Foods List </p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/${item.image}`} alt="" />
              <p style={{fontWeight:"bold",fontSize:"15px"}} >{item.name}</p>
              <p>{item.category}</p>
              <p style={{fontWeight:"bold"}} >${item.price}</p>
              <p onClick={()=>{removeFood(item._id)}} className='remove-food'>X</p>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default List