import React, { useContext, useState } from 'react'
import { FaCirclePlay } from "react-icons/fa6";
import { IoPlayCircleSharp } from "react-icons/io5";
import { MusicContext } from '../App';
import Spinner from './Spinner';

export default function ViewList() {
    const { currentSong, setCurrentSong, Cplaylist, setCPlaylist, setCPlaylistDetails, viewPlaylist, setViewPlaylist } = useContext(MusicContext);

    const [durations, setDurations] = useState({}); // Store durations for each song

    const handleMetadata = (id, audioElement) => {
        if (audioElement) {
            setDurations((prevDurations) => ({
                ...prevDurations,
                [id]:`${Math.floor(audioElement.duration.toFixed(2) / 60)<10 ? `0${Math.floor(audioElement.duration.toFixed(2) / 60)}` : Math.floor(audioElement.duration.toFixed(2) / 60)}: ${Math.floor(audioElement.duration.toFixed(2) % 60)<10 ? `0${Math.floor(audioElement.duration.toFixed(2) % 60)}` : Math.floor(audioElement.duration.toFixed(2) % 60)}`, // Store duration in seconds
            }));
        }
    };

    const playPlaylist=(playlist)=>{
        setCPlaylist(playlist.songs);
        setCPlaylistDetails(playlist);
        setCurrentSong(playlist.songs[0]);

    }
    
    const handleMusic=(song,playlist)=>{
        setCPlaylist(playlist.songs);
        setCPlaylistDetails(playlist);
        setCurrentSong(song);
    }
 

    return (
        <div className='viewMusicList'>
            <div className='viewPlaylistDetails'>
                <img src={`http://127.0.0.1:8000/${viewPlaylist.image}`} alt="" />
                <div>
                    <span id='title'>{viewPlaylist.name}</span>
                    <span id='albumP'>a!music - {viewPlaylist.created_at.slice(0,4)}</span>
                    <span id='Pdetails'>total {viewPlaylist.songs.length<=9 ?`0${viewPlaylist.songs.length}` : viewPlaylist.songs.length} songs</span>
                    <button onClick={()=>playPlaylist(viewPlaylist)}> <i><FaCirclePlay /> </i> Play Playlist</button>
                </div>
            </div>
            <div className='tableDivList'>
                <div className='table-main-div'>
                    <div id='head'>
                        <span id='song'>Song</span>
                        <span id='artist'>Artist</span>
                        <span id='album'>Album</span>
                        <span id='time'>Time</span>
                        <span id='play'>Play</span>
                    </div>
                    {viewPlaylist.songs.map((song) => {
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
                                <span id='playCircle' onClick={()=>handleMusic(song,viewPlaylist)}><IoPlayCircleSharp /></span>
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
