import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { TbPlayerStopFilled } from "react-icons/tb";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { TbPlayerSkipBackFilled } from "react-icons/tb";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";
import { MusicContext } from '../App';
import { useMediaQuery } from 'react-responsive'

export default function Player() {
    const { currentSong, setCurrentSong, Cplaylist, CplaylistDetails } = useContext(MusicContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [musicLength, setMusicLength] = useState("04:00");
    const [musicCLength, setMusicCLength] = useState("00:00");
    const [audioProgress, setAudioProgress] = useState(0)
    const musicRef = useRef();

    const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 769px)' })
    const isTab = useMediaQuery({ query: '(max-width: 768px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 480px)' })


    const playMusic = () => {
        if (isPlaying) {
            musicRef.current.pause();
            setIsPlaying(false);
        }
        else if (isPlaying == false) {
            musicRef.current.play();
            setIsPlaying(true);
        }
    }

    const handleMusicRange = (e) => {
        setAudioProgress(e.target.value)
        musicRef.current.currentTime = e.target.value * musicRef.current.duration / 100;
    }

    const handleAudioUpdate = () => {
        let minutes = Math.floor(musicRef.current.duration / 60);
        let seconds = Math.floor(musicRef.current.duration % 60);
        let totalTime = `${minutes < 10 ? `0${minutes}` : minutes}: ${seconds < 10 ? `0${seconds}` : seconds}`;
        setMusicLength(totalTime);

        let cminutes = Math.floor(musicRef.current.currentTime / 60);
        let cseconds = Math.floor(musicRef.current.currentTime % 60);
        let ctotalTime = `${cminutes < 10 ? `0${cminutes}` : cminutes}: ${cseconds < 10 ? `0${cseconds}` : cseconds}`;
        setMusicCLength(ctotalTime);

        const progress = (musicRef.current.currentTime / musicRef.current.duration) * 100;
        setAudioProgress(isNaN(progress) ? 0 : progress);

    }


    const playNextSong = () => {
        var i = Cplaylist.map(e => e.id).indexOf(currentSong.id);
        var len = Object.keys(Cplaylist).length;
        if (i + 1 < len) {
            // console.log(Cplaylist[i+1]);
            setCurrentSong(Cplaylist[i + 1]);
        }
        else {
            setCurrentSong(Cplaylist[0]);
        }
        setAudioProgress(0);

    }
    useEffect(() => {
        if (currentSong) {
            musicRef.current.load(); 
            musicRef.current.play();
            setIsPlaying(true);
        }
    }, [currentSong]);
    const playPrevSong = () => {
        var i = Cplaylist.map(e => e.id).indexOf(currentSong.id);
        var len = Object.keys(Cplaylist).length;
        if (i - 1 < 0) {
            // console.log(Cplaylist[i+1]);
            setCurrentSong(Cplaylist[len - 1]);
        }
        else {
            setCurrentSong(Cplaylist[i - 1]);
        }
        setAudioProgress(0);
    }
    return (
        <>    {(isDesktopOrLaptop || isBigScreen) && !isMobile && !isTab && (
            <div id='player'>
                <audio src={`${currentSong === null ? '' : `http://127.0.0.1:8000/${currentSong.audio_file} `}`} ref={musicRef}
                    onTimeUpdate={handleAudioUpdate} onEnded={playNextSong}
                ></audio>
                <div id='player-1'>
                    <div className={`${CplaylistDetails == null ? 'd-none' : 'd-playlist'} `}>
                        <img src={`${CplaylistDetails == null ? '' : `http://127.0.0.1:8000/${CplaylistDetails.image}`} `} alt="" />
                        <span>{`${CplaylistDetails == null ? '' : CplaylistDetails.name} `}</span>
                    </div>
                    <span className='fw-bold' id='title'>{currentSong === null ? 'Title of Song' : currentSong.title}</span>
                    <span className='' id='artist' >{currentSong === null ? 'Title of Song' : currentSong.artist.map((person) => {
                        return <>
                            {person.name},
                        </>
                    })}</span>
                </div>
                <div id='player-2'>
                    <img src={`${currentSong === null ? '' : `http://127.0.0.1:8000/${currentSong.image}`}`} alt="" />
                </div>
                <div id='player-3'>
                    <div id='player-31'><input type="range" value={audioProgress} onChange={handleMusicRange} /></div>
                    <div id='player-32'>
                        <span>{musicCLength}</span>
                        <span>{musicLength}</span>
                    </div>
                    <div id='player-33'>
                        <span onClick={playPrevSong}><TbPlayerSkipBackFilled /></span>
                        <span onClick={currentSong === null ? '' : playMusic}>{isPlaying ? <TbPlayerStopFilled /> : <TbPlayerPlayFilled />}</span>
                        <span onClick={playNextSong}><TbPlayerSkipForwardFilled /></span>
                    </div>
                </div>
            </div>
        )}

            {(isMobile || isTab) && !isDesktopOrLaptop && !isBigScreen && (

                <div id='player'>
                    <audio src={`${currentSong === null ? '' : `http://127.0.0.1:8000/${currentSong.audio_file} `}`} ref={musicRef}
                        onTimeUpdate={handleAudioUpdate} onEnded={playNextSong}
                    ></audio>
                    <div id='player-1'>
                        <div className={`${CplaylistDetails == null ? 'd-none' : 'd-playlist'} `}>
                            <img src={`${CplaylistDetails == null ? '' : `http://127.0.0.1:8000/${CplaylistDetails.image}`} `} alt="" />
                            <span>{`${CplaylistDetails == null ? '' : CplaylistDetails.name} `}</span>
                        </div>
                        <div id='player-2'>
                            <img src={`${currentSong === null ? '' : `http://127.0.0.1:8000/${currentSong.image}`}`} alt="" />
                            <div>
                            <span className='fw-bold' id='title'>{currentSong === null ? 'Title of Song' : currentSong.title}</span>
                            <span className='' id='artist' >{currentSong === null ? 'Title of Song' : currentSong.artist.map((person) => {
                                return <>
                                    {person.name},
                                </>
                            })}</span>
                            </div>
                        </div>
                    </div>
                    <div id='player-3'>
                        <div id='player-31'><input type="range" value={audioProgress} onChange={handleMusicRange} /></div>
                        <div id='player-32'>
                            <span>{musicCLength}</span>
                            <span>{musicLength}</span>
                        </div>
                        <div id='player-33'>
                            <span onClick={playPrevSong}><TbPlayerSkipBackFilled /></span>
                            <span onClick={currentSong === null ? '' : playMusic}>{isPlaying ? <TbPlayerStopFilled /> : <TbPlayerPlayFilled />}</span>
                            <span onClick={playNextSong}><TbPlayerSkipForwardFilled /></span>
                        </div>
                    </div>
                </div>
            )}







        </>

    )
}

