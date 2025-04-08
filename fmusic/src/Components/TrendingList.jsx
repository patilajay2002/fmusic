import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, FreeMode } from 'swiper/modules';
import { FaCirclePlay } from "react-icons/fa6";
import { MusicContext } from '../App';
import Spinner from './Spinner';


export default function TrendingList() {
    const [hover, setHover] = useState(false);
    const [songs,setSongs]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    const {currentSong,setCurrentSong,Cplaylist,setCPlaylist,setCPlaylistDetails}=useContext(MusicContext);

    useEffect(() => {
        const token = localStorage.getItem("access");
        axios.get("http://127.0.0.1:8000/get/music/",{
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setSongs(response.data);            
            setLoading(false);
            
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
        }, []);

    const handlemusicPlay=(song)=>{
        if (Cplaylist!=songs){
            setCPlaylist(songs);
        }
        if(currentSong!=song){
            setCurrentSong(song);
        }
        setCPlaylistDetails(null);
    }    
        
    return (
        <div className='trending' 
        onMouseOver={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
        >
            <p>Latest Songs &gt; </p>
            {loading && <Spinner/> }
            
                    <div className='swiper-div-list'>
                        {songs.slice(0,15).map((song)=>{
                            return <>
                            <div className='music-div-list'>
                                <img src={`http://127.0.0.1:8000/${song.image}`} alt="" />
                                <div>
                                    <span id='title'>{song.title}</span>
                                    <span id='artist'>{song.artist.map((person)=>{
                                        return<>
                                            {person.name},
                                        </>
                                    })}</span>
                                </div>
                                <span onClick={()=>handlemusicPlay(song)} id='list-play-icon' ><FaCirclePlay/></span>
                            </div>
                            </>
                        })}
                        <div className='TrendingMusic'>
                                <Link className='link' to="/all/music"> <i><FaCirclePlay /> </i> view all music</Link>
                        </div>
                    </div>

    </div>
  )
}
