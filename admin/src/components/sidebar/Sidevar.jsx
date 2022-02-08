import React from 'react'
import { Link } from 'react-router-dom'
import './sidevar.scss'
import {MdLineStyle ,MdPlayCircleOutline,MdTimeline, MdList , MdTrendingUp , MdOutlineTopic,MdError, MdBarChart,MdOutlineDynamicFeed , MdOutlineEmail ,MdOutlineChatBubbleOutline} from 'react-icons/md'
import {FaRegUser ,FaRupeeSign} from 'react-icons/fa'
// import {AiOutlineShop} from 'react-icons/ai'

const Sidevar = () => {
    return (
        <div className='sidebar'>
           <div className="sidebarWrapper">
               <div className="sidebarMenu">
                   <h3 className="sidebarTitle">Dashboard</h3>
                   <ul className="sidebarList">
                       <Link to="/" className='link'>
                            <li className="sidebarListItem active" >
                                <MdLineStyle className='sidebarIcon'/>
                                Home
                            </li>
                       </Link>
                       <li className="sidebarListItem">
                           <MdTimeline className='sidebarIcon'/>
                           Analytics
                       </li>
                       <li className="sidebarListItem">
                           <MdTrendingUp className='sidebarIcon'/>
                           Sales
                       </li>
                   </ul>

                   
               </div>
               <div className="sidebarMenu">
                   <h3 className="sidebarTitle">Quik Menu</h3>
                   <ul className="sidebarList">
                       <Link to="users" className='link'>
                        <li className="sidebarListItem active" >
                            <FaRegUser className='sidebarIcon'/>
                            Users
                        </li>
                       </Link>
                       <Link to="/movies" className='link'>
                            <li className="sidebarListItem">
                                <MdPlayCircleOutline className='sidebarIcon'/>
                                Movies
                            </li>
                       </Link>
                       <Link to='/lists' className="link">

                       <li className="sidebarListItem">
                           <MdList className='sidebarIcon'/>
                           List
                       </li>
                       </Link>
                       <li className="sidebarListItem">
                           <MdBarChart className='sidebarIcon'/>
                           Report
                       </li>
                   </ul>

                   
               </div>
               <div className="sidebarMenu">
                   <h3 className="sidebarTitle">Notification</h3>
                   <ul className="sidebarList">
                       <li className="sidebarListItem active" >
                           <MdOutlineEmail className='sidebarIcon'/>
                           Mail
                       </li>
                       <li className="sidebarListItem">
                           <MdOutlineDynamicFeed className='sidebarIcon'/>
                           Feedback
                       </li>
                       <li className="sidebarListItem">
                           <MdOutlineChatBubbleOutline className='sidebarIcon'/>
                           Messages
                       </li>
                   </ul>

                   
               </div>
               <div className="sidebarMenu">
                   <h3 className="sidebarTitle">Staff</h3>
                   <ul className="sidebarList">
                       <li className="sidebarListItem active" >
                           <MdOutlineTopic className='sidebarIcon'/>
                           Manage
                       </li>
                       <li className="sidebarListItem">
                           <MdTimeline className='sidebarIcon'/>
                           Analytics
                       </li>
                       <li className="sidebarListItem">
                           <MdError className='sidebarIcon'/>
                           Reports
                       </li>
                   </ul>

                   
               </div>
           </div>
        </div>
    )
}

export default Sidevar
