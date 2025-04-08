import React, { useContext, useState } from 'react'
import { AuthContext } from './AuthContext';
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
function Login() {
  const [formData, setFormData] = useState({"username": "","password": ""})
  const navigate = useNavigate();
  const {login} =useContext(AuthContext);
  const handleChange=(e)=>setFormData({...formData,[e.target.name]:e.target.value})

  const handleSubmit=async (e)=>{
      e.preventDefault();
      try{
        console.log(formData)
          await login(formData);
          navigate("/");
      }catch(error){
          console.log("error",error);
      }
  }

  return (
    <div className='login'>
        <form action="" onSubmit={handleSubmit}>
            <p>Login</p>
            <input type="text"  name='username' placeholder='Enter Username' onChange={handleChange} required  />
            <input type="password"  name='password' placeholder='Enter Password' onChange={handleChange} required />
            <input type="submit"  className='btn btn-info' value="login" />
            <span>not register ?<a href="/register"> Register</a></span>
            {/* <i><a href="/"><ImCross/></a></i> */}
        </form>
    </div>
  )
}
export default Login
