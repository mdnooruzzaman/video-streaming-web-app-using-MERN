import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import './topvar.scss'
import {MdOutlineNotifications , MdLanguage ,MdSettings , MdLogout} from 'react-icons/md'
import { logOut } from '../../context/authContext/apiCalls'
import { AuthContext } from '../../context/authContext/AuthContext'
import { logout } from '../../context/authContext/AuthAction'
import { useEffect } from 'react'
import axios from 'axios'

const Topvar = (props) => {
    // const {dispatch} = useContext(AuthContext)
    // const navigate = useNavigate()
    
    // const handleLogout = () => {
    //     dispatch(logout());
    //     navigate('/login')
        
    // }

    // const username = JSON.parse(localStorage.getItem("user")).username;
    // const profilePic = JSON.parse(localStorage.getItem("user")).profilePic;

    useEffect(() => {
        const getUserInfo = async ()=>{
            const res = await axios.get('/api')
        }
    },[])
    return (
        <div className='topvar'>
            <div className="wrapper">
                <div className="topLeft">
                    <span className="logo">Admin-<b>Panel</b></span>
                </div>
                <div className="topRight">
                        <div className="topIconConataier">
                            <MdOutlineNotifications className='icon'/>
                            <span className='topIconBadge'>2</span>

                        </div>
                        <div className="topIconConataier">
                            <MdLanguage className='icon'/>
                            <span className='topIconBadge'>2</span>

                        </div>
                        <div className="topIconConataier ">
                            <MdSettings className='icon setting' />
                        </div>
                        <div className="topIconContainer">
                            <MdLogout className='icon' onClick={props.logout} />
                        </div>
                        {/* <div className="username">

                        
                        </div> */}
                        <img src={props.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXZNeqt-gCue8__-GW0ubAG_1qjPDq85TLDg&usqp=CAU"} alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}

export default Topvar
