import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Loginpopup.css'
import axios from 'axios'
import { Storecontext } from '../../context/Storecontext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Loginpopup = ({setShowLogin}) => {
    const [currState,setCurrState] = useState("Login")
    const {url,token,setToken} = useContext(Storecontext)
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })
    const navigate = useNavigate()

    const onChangeHandler = (event)=>{
        const name = event.target.name
        const value = event.target.value

        setData(data=>({...data,[name]:value}))
       
    }
    const onLogin = async (event)=>{
        
        event.preventDefault()
        const status = currState == "Login"? "login":"register"
        const res = await axios.post(`${url}/api/user/${status}`,data)
        if(res.data.user == "admin"){
            navigate('/cart')
            setShowLogin(false);
        }
        else if(res.data.success){ 

            setToken(res.data.token)
            localStorage.setItem("token",res.data.token)
            setShowLogin(false)
            toast.success(currState+" success")
        }
        else{
            toast.error(res.data.message);
        }
    }
  return (
    <div className='login-popup'>

        <form  className="login-popup-container" onSubmit={onLogin}>
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState === "Signup" ? <input name='name' onChange={onChangeHandler} type="text" placeholder='Name' value = {data.name} required /> : ""}
                <input type="text" name='email' onChange={onChangeHandler} placeholder='Email' value={data.email} required/>
                <input type="text" name='password' onChange={onChangeHandler} placeholder='Password' value={data.password} required/>
            </div>
            <button type='submit'>{currState === "Signup" ? "Create account":"Login"}</button>
            <div className='login-popup-conditions'>
                <input type="checkbox" required/>
                <p>By continuing, I agree to the terms and conditions</p>
            </div>
            {currState === "Login" ? <p>Create New Account? <span onClick={()=>setCurrState("Signup")}>click here!</span> </p>
             : <p>Already have an account ?<span onClick={()=>setCurrState("Login")}>click here!</span></p>  }
           
           
        </form>


       
  
       
       
        
    </div>
  )
}

export default Loginpopup