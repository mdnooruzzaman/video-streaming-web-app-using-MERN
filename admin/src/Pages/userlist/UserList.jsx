import { React, useState } from 'react'
import './userlist.scss';
import { Circles, Oval, TailSpin } from 'react-loader-spinner'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom';
import userRows from '../../UserData';
import { useEffect } from 'react';
import axios from 'axios';

const UserList = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUserList = async () => {
            try {
                const res = await axios.get('/api/user?new=true',
                    { headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken } });
                setData(res.data);
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getUserList();
    }, [])

    const handleDelete = (id) => {
        const deleteUser = async () => {
            try {
                console.log("deleting")
                await axios.delete("/api/user/delete/" + id,
                    { headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken } });

            } catch (err) {
                console.log(err)
            }
        }
        deleteUser();
    }





    return (
        <div className='userList'>
            <table className='userTableList'>
                <thead>

                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading
                            ? (
                                <tr  >
                                    <td className="spiner" >
                                        <TailSpin color="darkblue" height="50" width="50" />
                                    </td>
                                </tr>
                            )
                            : (


                                <>
                                    {data.map((d) => (


                                        <tr key={d._id}>
                                            <td className='userID'>{d._id}</td>
                                            <td className='userTitle'><img src={d.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXZNeqt-gCue8__-GW0ubAG_1qjPDq85TLDg&usqp=CAU"} className='userImg' />{d.username}</td>
                                            <td>{d.email}</td>
                                            <td>{d.createdAt}</td>

                                            <td className='userListAction'>

                                                <Link to={"/user/" + d._id}>
                                                    <button className='userListEdit'>Edit</button>
                                                </Link>

                                                <MdDelete className='userListDelete' onClick={() => handleDelete(d._id)} />

                                            </td>
                                        </tr>
                                    ))

                                    }
                                </>
                            )}
                </tbody>

            </table>

        </div>
    )
}

export default UserList
