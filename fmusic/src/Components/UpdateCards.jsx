import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, FreeMode } from 'swiper/modules';
import axios from "axios";
import { FaCirclePlay } from "react-icons/fa6";
import { MusicContext } from '../App';
import { TbLayoutListFilled } from "react-icons/tb";
import Spinner from './Spinner';
import { useMediaQuery } from 'react-responsive'


export default function UpdateCards() {
    const [hover, setHover] = useState(false);
    const [playlists, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 769px)' })
    const isTab = useMediaQuery({ query: '(max-width: 768px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 480px)' })



    const { currentSong, setCurrentSong, Cplaylist, setCPlaylist, setCPlaylistDetails, viewPlaylist, setViewPlaylist } = useContext(MusicContext);



    useEffect(() => {
        const token = localStorage.getItem("access");
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/get/playlist/",{
                    headers: { Authorization: `Bearer ${token}` },
                  });
                setPlaylist(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, []);


    const handlePlaylist = async (playlist) => {
        setCPlaylist(playlist.songs);
        // console.log(playlist.songs[0]);
        setCPlaylistDetails(playlist);
        console.log(playlist);
        setCurrentSong(playlist.songs[0]);
    }

    const handleListPlaylist = (playlist) => {
        setViewPlaylist(playlist);
    }

    return (
        <div className='updated-playlist'
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <p>Updated Playlist &gt; </p>
            {loading && <Spinner />}
            <Swiper
                slidesPerView={(isMobile || isTab) ? 3 : 5}
                spaceBetween={10}
                navigation={hover}
                modules={[Navigation, FreeMode]}
                className="mySwiper"
            >
                {playlists.slice(0, 7).map((playlist) => {
                    return <>
                        <SwiperSlide className='swipers' key={playlist.id}>
                            <div className='swiper-div-container'>
                                <div><img src={`http://127.0.0.1:8000/${playlist.image}`} alt="" />
                                    <span className="updatePlay" onClick={() => handlePlaylist(playlist)} ><FaCirclePlay /></span>
                                    <Link className='viewList' to="/view/list"> <i onClick={() => handleListPlaylist(playlist)} ><TbLayoutListFilled /></i></Link>
                                </div>
                                <span id='title'>{playlist.name}</span>
                                <span id='numberSongs'>{playlist.songs.length} Songs</span>
                            </div>
                        </SwiperSlide>
                    </>
                })}
            </Swiper>
        </div>
    )
}
