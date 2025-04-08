import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { FaCirclePlay } from "react-icons/fa6";
import { MusicContext } from '../App';
import { IoSearchCircle } from "react-icons/io5";

export default function Playlist() {
    const [dataa, setDataa] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setCurrentSong, setCPlaylist, setCPlaylistDetails } = useContext(MusicContext);
    const [query,setQuery]=useState("");


    useEffect(() => {
        const token = localStorage.getItem("access");

        const fetchPlaylists = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/get/playlist/",{
                    headers: { Authorization: `Bearer ${token}` },
                  });
                setDataa(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, []); 

    const playPlaylist=(playlist)=>{
        setCPlaylist(playlist.songs);
        setCPlaylistDetails(playlist);
        setCurrentSong(playlist.songs[0]);
    }
    const handleSearch= async()=>{
        const token = localStorage.getItem("access");
        await axios.get(`http://127.0.0.1:8000/get/playlist/search/?q=${query}/`,{
            headers: { Authorization: `Bearer ${token}` },
          }).then((response)=>{
            setDataa(response.data);
            setLoading(false);
        }).catch((error)=>{
            setError(error);
            setLoading(false);
        })
    }
    return (
        <div className='viewMusicList'>
             <div className='searchDiv'>
                <input type="search" name="" id="" placeholder='search Playlist' value={query} onChange={(e)=>setQuery(e.target.value)} />
                <button onClick={()=>handleSearch()}> <IoSearchCircle />   </button>
            </div>
            <p>All Playlists</p>
            {loading && <Spinner/> }

            {dataa.map((data) => {
                return <>
                    <div className='viewPlaylistDetails'>
                        <img src={`http://127.0.0.1:8000/${data.image}`} alt="" />
                        <div>
                            <span id='title'>{data.name}</span>
                            <span id='albumP'>a!music - {data.created_at.slice(0, 4)}</span>
                            <span id='Pdetails'>total {data.songs.length <= 9 ? `0${data.songs.length}` : data.songs.length} songs</span>
                            <button onClick={() => playPlaylist(data)}> <i><FaCirclePlay /> </i> Play Playlist</button>
                        </div>
                    </div>
                </>
            })}
        </div>
    )
}
