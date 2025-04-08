import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { IoSearchCircle } from "react-icons/io5";
import { IoPlayCircleSharp } from "react-icons/io5";
import { MusicContext } from '../App';
import Spinner from './Spinner';
export default function AllMusic() {

    const { setCurrentSong, setCPlaylist } = useContext(MusicContext);

    const [query,setQuery]=useState("");
    const [musicList, setMusicList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access");
        axios.get("http://127.0.0.1:8000/get/music/",{
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => {
            setMusicList(response.data);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        })
    }, [])

    const [durations, setDurations] = useState({}); // Store durations for each song

    const handleMetadata = (id, audioElement) => {
        if (audioElement) {
            setDurations((prevDurations) => ({
                ...prevDurations,
                [id]: `${Math.floor(audioElement.duration.toFixed(2) / 60) < 10 ? `0${Math.floor(audioElement.duration.toFixed(2) / 60)}` : Math.floor(audioElement.duration.toFixed(2) / 60)}: ${Math.floor(audioElement.duration.toFixed(2) % 60) < 10 ? `0${Math.floor(audioElement.duration.toFixed(2) % 60)}` : Math.floor(audioElement.duration.toFixed(2) % 60)}`, // Store duration in seconds
            }));
        }
    };

    const handleMusic = (song) => {
        setCurrentSong(song);
        setCPlaylist(musicList);
    }

    const handleSearch= async()=>{
        const token = localStorage.getItem("access");
        await axios.get(`http://127.0.0.1:8000/get/music/search/?q=${query}/`,{
            headers: { Authorization: `Bearer ${token}` },
          }).then((response)=>{
            setMusicList(response.data);
            setLoading(false);
        }).catch((error)=>{
            setError(error);
            setLoading(false);
        })
    }

    return (
        <div className='viewMusicList'>
            <div className='searchDiv'>
                <input type="search" name="" id="" placeholder='search Music' value={query} onChange={(e)=>setQuery(e.target.value)} />
                <button onClick={()=>handleSearch()}> <IoSearchCircle />   </button>
            </div>
            <div className='tableDivList'>
                <p>All Music</p>
                {loading && <Spinner/> }
                <div className='table-main-div'>
                    <div id='head'>
                        <span id='song'>Song</span>
                        <span id='artist'>Artist</span>
                        <span id='album'>Album</span>
                        <span id='time'>Time</span>
                        <span id='play'>Play</span>
                    </div>
                    {musicList.map((song) => {
                        return <>
                            <div className='songDetail' key={song.id}>
                                <span id='title'><img src={`http://127.0.0.1:8000/${song.image}`} alt="" />{song.title}</span>
                                <span id='singer'>{song.artist.map((person, index) => {
                                    return <>
                                        {person.name}{index < song.artist.length - 1 ? ", " : ""}
                                    </>
                                })}</span>

                                <span id='albumm'>{song.album.title}</span>
                                <span id='duration'>{durations[song.id] || "Loading..."}</span>
                                <span id='playCircle' onClick={() => handleMusic(song)}><IoPlayCircleSharp /></span>
                                <audio
                                    src={`http://127.0.0.1:8000/${song.audio_file}`}
                                    onLoadedMetadata={(e) => handleMetadata(song.id, e.target)}
                                />

                            </div>
                        </>
                    })}

                </div>
            </div>
        </div>
    )
}
