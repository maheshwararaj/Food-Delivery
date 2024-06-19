import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

export const Storecontext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "https://food-delivery-yab3.onrender.com"
    const [token,setToken] = useState("")
    const [cartItems,setCartItems] = useState({});
    const [food_list,setFoodlist] = useState([])
    
    const addToCart = async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
           
        }
    }
 
    const removeFromCart= async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
    const removeAllFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:0}))
    }

   const getTotalCartAmount = ()=>{
        let total_amount = 0;
        for(const item in cartItems){
            
            if(cartItems[item] > 0){
                let iteminfo = food_list.find((product)=> product._id === item )
                if(iteminfo)
                    total_amount += iteminfo.price * cartItems[item]
            }
        
        }
        return total_amount;
   }
   
   const getTotalItemsInCart = ()=>{
        let total_count = 0;
        if(cartItems !== 'undefined'){
            console.log(cartItems)
            for(const item in cartItems){
                if(cartItems[item] > 0)
                    total_count += cartItems[item]
                
             }
        }
        return total_count;
        
   }

   const fetchFoodList = async ()=>{
    const response = await axios.get(`${url}/api/food/list`)
    setFoodlist(response.data.data)
    
   }

   const loadCartData = async (token) =>{
    const response = await axios.post(`${url}/api/cart/get`,{},{headers:{token}})
   
    setCartItems(response.data.cartData);
    
   }
    
   
   useEffect( ()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                
                await loadCartData(localStorage.getItem("token"))
                
               
            }
        }
        loadData();
       
    
   },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        loadCartData,
        removeFromCart,
        getTotalCartAmount,
        removeAllFromCart,
        getTotalItemsInCart,
        url,
        token,
        setToken,
       

    }


  return (
    <Storecontext.Provider value={contextValue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default StoreContextProvider;
