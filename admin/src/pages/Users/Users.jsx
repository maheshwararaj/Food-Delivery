import React from 'react'
import './Users.css'
import axios from 'axios'
import { useEffect,useState } from 'react'
import {toast} from 'react-toastify'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'
const Users = ({url}) => {


  const [userList,setUserList] = useState([])
  const {setUserCount} = useContext(AdminContext)
  const getUserlist = async()=>{
   const response = await axios.get(`${url}/api/user/getusers`);
    setUserList(response.data.userlist);
  }

  const removeUser = async (id) => {
    const response = await axios.post(`${url}/api/user/remove`,{id})
    await getUserlist();
    if(response.data.success){
        toast.success("User Removed");
        setUserCount(prev => prev-1)
    }
    else{
      toast.error("cannot remove user")
    }
  }
  useEffect(()=>{
    getUserlist();
  },[])
  return (
    <div className='users add flex-col'>
        <p>All Users</p>
        <div className="user-list flex-col">
            <div className="user-list-format title">
              <b>Name</b>
              <b>Email</b>
            
              <b>Remove</b>
            </div>

            {userList.map((user)=>{

                
                return(
                  <div className="user-list-format" key={user._id}>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                   
                    <p onClick={()=> removeUser(user._id)} className='remove'>X</p>
                  </div>
                );
            })}


          
         
        </div>
    </div>
  )
}

export default Users