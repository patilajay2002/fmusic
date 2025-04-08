import React, { createContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Player from './Components/Player';
import Navbar from './Components/Navbar';
import Landing from './Components/Landing';
import TrendingList from './Components/TrendingList';
import UpdateCards from './Components/UpdateCards';
import ViewList from './Components/ViewList';
import AllMusic from './Components/AllMusic';
import Playlist from './Components/Playlist';
import Login from './Components/Login';
import Register from './Components/Register';
import PrivateRouter from './Router/PrivateRouter';
import { AuthProvider } from './Components/AuthContext';
export const MusicContext = createContext();
function App() {
    const [currentSong,setCurrentSong] =useState(null);
    const [Cplaylist,setCPlaylist]=useState([]);
    const [CplaylistDetails,setCPlaylistDetails]=useState(null);

    const [viewPlaylist,setViewPlaylist]=useState([]);
  return (
    <>
              <MusicContext.Provider value={{currentSong,setCurrentSong , Cplaylist,setCPlaylist,CplaylistDetails,setCPlaylistDetails,viewPlaylist,setViewPlaylist}}>
              <AuthProvider>
              <Router>
                    <Navbar/>
                    {/* <Login/> */}
                    {/* <Register/> */}
                  <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route element={<PrivateRouter/>}>
                      <Route  path='/' element={<Landing/>} />
                      <Route path="/view/list" element={<ViewList/>} />
                      <Route path="/all/music" element={<AllMusic/>} />
                      <Route path="/all/playlist" element={<Playlist/>} />
                    </Route>
                  </Routes>
              </Router>
              </AuthProvider>
            </MusicContext.Provider>
    </>
  )
}

export default App