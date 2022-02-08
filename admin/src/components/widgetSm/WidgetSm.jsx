import React from 'react';
import './widgetSm.scss';
import { MdVisibility } from 'react-icons/md'
import { useState, useEffect } from "react";
import axios from 'axios';

const WidgetSm = () => {
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        const getNewUsers = async () => {
            try {
                const res = await axios.get("/api/user/newjoiner?new=true", {
                    headers:
                        { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken }
                });
                setNewUsers(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getNewUsers();
    }, [])

    return (
        <div className='widgetSm'>
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {newUsers.map((user) => (

                    <li className="widgetSmListItem" key={user._id}>
                        {/* "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" */}
                        <img

                            src={user.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXZNeqt-gCue8__-GW0ubAG_1qjPDq85TLDg&usqp=CAU"}
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.username}</span>
                        </div>
                        <button className="widgetSmButton">
                            <MdVisibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                ))}


            </ul>


        </div>
    )
}

export default WidgetSm;
