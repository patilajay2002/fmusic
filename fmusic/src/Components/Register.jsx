import React, { useState } from 'react'
import { registerUser } from '../middleware/api'
import { useNavigate } from "react-router-dom";

import { ImCross } from "react-icons/im";
function Register() {
  const [formData, setFormData] = useState({
    "first_name": "",
    "last_name": "",
    "username": "",
    "email": "",
    "password": "",
})
const navigate = useNavigate();

const handleChange=(e)=>setFormData({...formData,[e.target.name]:e.target.value})

const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
        const response =await registerUser(formData);
        console.log(response.data);
        navigate("/login");
    }catch(error){
        console.log("error",error);
    }
}

  return (
    <div className='login'>
        <form method="post" onSubmit={handleSubmit}>
            <p>Create an Account</p>
            <input type="text"  name='first_name' placeholder='Enter First Name'  onChange={handleChange} required />
            <input type="text"  name='last_name' placeholder='Enter Last Name' onChange={handleChange} required />
            <input type="email"  name='email' placeholder='Enter Email' onChange={handleChange} required />
            <input type="text"  name='username' placeholder='Enter Username' onChange={handleChange} required />
            <input type="password"  name='password' placeholder='Enter Password' onChange={handleChange} required />
            <input type="submit"  className='btn btn-info' value="register" />
            <span>already register ?<a href="/"> Login</a></span>
            {/* <i><a href="/"><ImCross/></a></i> */}
        </form>
    </div>
  )
}

export default Register
