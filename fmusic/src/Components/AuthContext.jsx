import React, { createContext, useContext, useEffect, useState } from 'react'
import { loginUser,logoutUser,getUser } from '../middleware/api';
import {jwtDecode} from "jwt-decode";
import { MusicContext } from '../App';
export const AuthContext = createContext();
export const  AuthProvider=({children})=> {
    const [user,setUser]=useState(null);
    const [accessToken,setAccessToken]=useState(localStorage.getItem("access") || "");
    const [refreshToken,setRefreshToken]=useState(localStorage.getItem("refresh") || "");
    const [error,setError]=useState(null);
    const {  setCurrentSong, setCPlaylist } = useContext(MusicContext);
    useEffect(() => {
      const fetchUser = async () => {
          try {
              const response = await getUser();
              setUser(response.data);
          } catch (error) {
              console.error("Error fetching user:", error);
          }
      };
      fetchUser();
  }, []);

    const login=async (credentials)=>{
        try{
            const response=await loginUser(credentials);
            setAccessToken(response.data.access);
            setRefreshToken(response.data.refresh);
            console.log(response.data);
    
            localStorage.setItem("access",response.data.access);
            localStorage.setItem("refresh",response.data.refresh);
    
            const userResponse=await getUser(response.data.access);
            setUser(userResponse.data);
            console.log("User  ...........",userResponse);
        }catch(error){
            setError(error);
            console.error(response?.error)
            alert("Invalid Credientials");
        }
    }

    const logout=async ()=>{
        try{
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            setUser(null);
            setAccessToken("");
            setRefreshToken("");
            setCurrentSong(null);
            setCPlaylist([]);
        }catch(error){
            setError(error);
        }
    }
  return (
    <AuthContext.Provider value={{ user, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  )
}
