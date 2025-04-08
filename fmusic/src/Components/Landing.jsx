import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "axios";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { MusicContext } from '../App';
import { FaCirclePlay } from "react-icons/fa6";

import { Pagination, Navigation, FreeMode } from 'swiper/modules';
import UpdateCards from './UpdateCards';
import TrendingList from './TrendingList';
import Spinner from './Spinner';
export default function Landing() {
    const [hover, setHover] = useState(false);
    const [landing, setLanding] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {currentSong,setCurrentSong,Cplaylist,setCPlaylist,setCPlaylistDetails}=useContext(MusicContext);

    useEffect(() => {
        const token = localStorage.getItem("access");
        axios.get('http://127.0.0.1:8000/get/track/',{
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => {
            setLanding(response.data);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        })
    }, [])

    const handleTrack=(track)=>{
        if(track.track_type === 'music'){
            setCurrentSong(track.music);
            setCPlaylistDetails(null);
        }
        else{
            setCPlaylistDetails(track.playlist);
            setCurrentSong(track.playlist.songs[0]);
        }
    }

    return (
        <div className='landing'
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <p>New</p>
            {loading && <Spinner/> }
            
            <Swiper
                slidesPerView={2}
                spaceBetween={5}
                navigation={hover}
                modules={[Navigation, FreeMode]}
                className="mySwiper"
            >
                {landing.map((track) => {
                    return <>
                        <SwiperSlide className='swipers' key={track.id}>
                            <div className='swiper-div'>
                                <div id='div-1' >
                                    <span id='title1'>{track.track_type === 'music' ? 'New Added Music' : 'Updated Playlist'}</span>
                                    <span id='title2'>{track.track_type === 'music' ? `${track.music.title}` : `${track.playlist.name}`}</span>
                                </div>
                                <div id='div-2' style={{
                                    backgroundImage: track.track_type === 'music'
                                        ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(http://127.0.0.1:8000/${track.music.image})`
                                        : `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(http://127.0.0.1:8000/${track.playlist.image})`
                                }}  >
                                    <span className='trackPlay' onClick={()=>handleTrack(track)}><FaCirclePlay/></span>
                                </div>
                            </div>
                        </SwiperSlide>
                    </>
                })}
            </Swiper>
            <TrendingList/>
            <UpdateCards/>
        </div>
    )
}
