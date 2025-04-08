import React, { useContext, useState } from 'react'
import logo from "../assets/images/logo/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { MdLibraryMusic } from "react-icons/md";
import { PiPlaylistFill } from "react-icons/pi";
import Player from './Player';
import { useMediaQuery } from 'react-responsive'
import { TiThMenu } from "react-icons/ti";
import { AuthContext } from './AuthContext';
import { FaCircleUser } from "react-icons/fa6";
export default function Navbar() {
    const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 769px)' })
    const isTab = useMediaQuery({ query: '(max-width: 768px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 480px)' })

    const [isView, setIsView] = useState(false);

    const handleMenu = () => {
        if (isView) {
            setIsView(false);
        }
        else if (isView == false) {
            setIsView(true);
        }
    }

    const navigate = useNavigate();
    const { accessToken, logout } = useContext(AuthContext);
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    }

    const [userProfile, setUserProfile] = useState('d-none');
    const handleUserProfile = () => {
        if (userProfile == 'd-none') {
            setUserProfile('d-flex');
        }
        else {
            setUserProfile('d-none');
        }
    }

    return (
        <div>
            {(isDesktopOrLaptop || isBigScreen) && !isMobile && !isTab && (
                <div>
                    <nav>
                        <div className='logo-div'>
                            <img src={logo} alt="" />
                            <span>amusic</span>
                        </div>
                        <div className='link-div'>
                            <Link to="/"><span><AiFillHome /> </span> Home</Link>
                            <Link to="/all/music"><span><MdLibraryMusic /></span> All Music</Link>
                            <Link to="/all/playlist"><span> <PiPlaylistFill /> </span>Playlist</Link>
                            <button className='profilebtn' onClick={handleUserProfile}> <FaCircleUser /></button>
                            <div className={`${userProfile} profileDiv`}>
                                {!accessToken && <>
                                    <span><Link className='link' to="/login">Login</Link></span>
                                    <span><Link className='link' to="/register">Register</Link></span>
                                </>}
                                {accessToken &&
                                    <span><button className='link' onClick={handleLogout}>Logout</button></span>
                                }
                            </div>

                        </div>
                    </nav>
                    <Player />
                </div>
            )}
            {(isMobile || isTab) && !isDesktopOrLaptop && !isBigScreen && (
                <div >
                    <div className='menu-btn'>
                        <div className='logo-div'>
                            <img src={logo} alt="" />
                            <span>amusic</span>
                        </div>
                        <button onClick={() => handleMenu()}><TiThMenu /></button>
                    </div>
                    <nav className={`${isView ? `d-flex flex-column` : `d-none`} navMobile`}>
                        <Link className='nav-links' to="/"><span><AiFillHome /> </span> Home</Link>
                        <Link className='nav-links' to="/all/music"><span><MdLibraryMusic /></span> All Music</Link>
                        <Link className='nav-links' to="/all/playlist"><span> <PiPlaylistFill /> </span>Playlist</Link>
                        {!accessToken && <>
                            <span><Link className='link btn btn-success w-50' to="/login">Login</Link></span>
                            <span><Link className='link btn btn-warning w-50' to="/register">Register</Link></span>
                        </>}
                        {accessToken &&
                            <span><button className='btn btn-info w-50 mx-3' onClick={handleLogout}>Logout</button></span>
                        }
                    </nav>
                    <Player />
                </div>
            )}
        </div>
    )
}
