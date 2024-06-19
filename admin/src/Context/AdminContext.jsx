import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

export const AdminContext = createContext(null);
const AdminContextProvider = (props) => {
  
    const [userCount,setUserCount] = useState(0);
    const [foodCount,setFoodCount] = useState(0)
    const fetchData = async()=>{
        
        const response = await axios.get("http://localhost:4000/api/user/userCount")
        if(response.data.success)
            setUserCount(response.data.count)

        else
            console.log("error");
        
        const res = await axios.get("http://localhost:4000/api/food/foodcount");
        if(res.data.success)
                setFoodCount(res.data.count);
        else 
            console.log("error")
    }

    useEffect(()=>{

        fetchData();
       
    },[])
  
    const contextValue = {
        userCount,
        setUserCount,
        foodCount,
        setFoodCount
    }


  return (
    <AdminContext.Provider value={contextValue}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
