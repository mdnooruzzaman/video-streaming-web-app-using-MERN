import React from 'react';
import { Link , useParams} from "react-router-dom";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import axios from 'axios'
import { useState , useEffect } from 'react';
import SuccessAlert from '../../components/successAlert/SuccessAlert';
import './setting.scss'
import { getDownloadURL, ref , uploadBytesResumable } from 'firebase/storage';
import {storage} from '../../firbase';
import {MdPermIdentity ,MdCalendarToday,MdPhoneAndroid , MdPublish ,MdMailOutline ,MdLocationSearching} from 'react-icons/md'

const User = () => {
    const location = useParams()
    const [toggel , setToggel] = useState(true)
    const [oneU , setOneU] = useState([])
    const [user , setUser] = useState([]);
    const [uploaded , setUploaded] = useState(0);
    const [progress , setProgress] = useState(0);
    const [img , setImage] = useState(null)
    console.log(location)
    const id = location.userId;
    
    

    useEffect(() => {
       
        const getOneUser = async (id) => {
            try{
                console.log(id+ " ka")
                const res = await axios.get('/api/user/find/'+ id)
                // {headers : { token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken }}) ;

                setOneU(res.data)
                
            }catch(err){
                console.log(err)
            }
        }
        getOneUser(id);
    } , [])
    console.log(oneU);

    const handleChange = (e)=>{
        const value = e.target.value;
        setUser({...user , [e.target.name]:value})
    }
    console.log(user)

    const handleUpload = (e)=>{
        e.preventDefault();

        const uploadImg = (img) =>{
            const storageRef = ref(storage , `/profilePic/${img.name}`);
            const uploadTask = uploadBytesResumable(storageRef , img )
            uploadTask.on("state_changes" , (snapshot) => {
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
                console.log(`Upload image is ${progress}% `)
                setProgress(progress)
            },
            err=> {console.log(err)},
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then(url => setUser((prev) => {
                            return { ...prev , "profilePic" : url}
                        })
                        ).then(
                            setUploaded((prev) => (prev + 1))
                        ).then(
                            console.log(uploaded)
                        )
               
            }
            )
        }
        uploadImg(img)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
         const uploadUserImg = async (id , user) => {
             try{
                const res = await axios.put('/api/user/'+id , user ,
                {headers:{token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken}})
                setUser(res.data)
                console.log(res.data);
                setToggel(false)
                setUploaded(0);
             }catch(err){
                 console.log(err)
             }
         }
         uploadUserImg(id , user)

    }

    const handleClick = ()=> {
        setToggel(true);
    }

    return (
        <div className="userSetting">

        <div className='user'>
            <div className="userTitleContainer">
                <h1 className="userTitle">Settings</h1>
               
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
                                <MdPermIdentity className='userShowIcon'/>
                                <span className="userShowInfoTitle">
                                    {oneU._id}
                                </span>
                            </div>
                            <div className="userShowInfo">
                                <MdCalendarToday className='userShowIcon'/>
                                <span className="userShowInfoTitle">
                                   {oneU.createdAt}
                                </span>
                            </div>
                            <div className="userShowTitle">Contact Details</div>
                            <div className="userShowInfo">
                                <MdPhoneAndroid className='userShowIcon'/>
                                <span className="userShowInfoTitle">
                                    +91 8752145287
                                </span>
                            </div>
                            <div className="userShowInfo">
                                <MdMailOutline className='userShowIcon'/>
                                <span className="userShowInfoTitle">
                                    {oneU.email}
                                </span>
                            </div>
                            <div className="userShowInfo">
                                
                            </div>
                        
                    </div>
                </div>

                <div className="userUpdate">
                <legend className="userUpdateTitle">Edit</legend>
                        {toggel ? <div></div> : <SuccessAlert crossClick={handleClick}/>}
                        <form className="userUpdateForm">
                            <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input
                                type="text"
                                placeholder={oneU.username}
                                className="userUpdateInput"
                                name='username'
                                onChange={handleChange}
                                />
                            </div>
                            
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                type="text"
                                placeholder={oneU.email}
                                className="userUpdateInput"
                                name='email'
                                onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Want to be a Admin?</label>
                                <select name="isAdmin" className='selectUser' onChange={handleChange}>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
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
                                <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setImage(e.target.files[0])} />
                                
                            </div>
                            <Progress  width={10} percent={progress} />
                            {
                                uploaded === 1 ? 
                                <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
                                :
                                <button className="userUpdateButton" onClick={handleUpload}>Upload</button>
                            }
                            </div>
                        </form>
                </div>
            </div>
        </div>
        </div>


    )
}

export default User
