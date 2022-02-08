import React from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import { useState, useEffect } from 'react';
import './user.scss'

import { MdPermIdentity, MdCalendarToday, MdPhoneAndroid, MdPublish, MdMailOutline, MdLocationSearching } from 'react-icons/md'

const User = () => {
    const location = useParams()
    const [oneU, setOneU] = useState([])
    console.log(location)
    const id = location.userId;


    useEffect(() => {

        const getOneUser = async (id) => {
            try {
                console.log(id + " ka")
                const res = await axios.get('/api/user/find/' + id)
                // {headers : { token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken }}) ;

                setOneU(res.data)

            } catch (err) {
                console.log(err)
            }
        }
        getOneUser(id);
    }, [])
    console.log(oneU)

    return (
        <div className='user'>
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src={oneU.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXZNeqt-gCue8__-GW0ubAG_1qjPDq85TLDg&usqp=CAU"} alt=""
                            className="userShowImg" />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{oneU.username}</span>

                        </div>
                    </div>
                    <div className="userShowButtom">
                        <div className="userShowTitle">Account Details</div>
                        <div className="userShowInfo">
                            <MdPermIdentity className='userShowIcon' />
                            <span className="userShowInfoTitle">
                                {oneU._id}
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <MdCalendarToday className='userShowIcon' />
                            <span className="userShowInfoTitle">
                                {oneU.createdAt}
                            </span>
                        </div>
                        <div className="userShowTitle">Contact Details</div>
                        <div className="userShowInfo">
                            <MdPhoneAndroid className='userShowIcon' />
                            <span className="userShowInfoTitle">
                                +91 8752145287
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <MdMailOutline className='userShowIcon' />
                            <span className="userShowInfoTitle">
                                {oneU.email}
                            </span>
                        </div>
                        <div className="userShowInfo">

                        </div>

                    </div>
                </div>

                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder={oneU.username}
                                    className="userUpdateInput"
                                />
                            </div>

                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder={oneU.email}
                                    className="userUpdateInput"
                                />
                            </div>

                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg"
                                    src={oneU.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXZNeqt-gCue8__-GW0ubAG_1qjPDq85TLDg&usqp=CAU"}
                                    alt=""
                                />
                                <label htmlFor="file">
                                    <MdPublish className="userUpdateIcon" />
                                </label>
                                <input type="file" id="file" style={{ display: "none" }} />
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default User
