import React, { useEffect } from 'react'
import './newlist.scss'

import { MdDelete } from 'react-icons/md'
import { Circles, Oval, TailSpin } from 'react-loader-spinner'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

const NewList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true)
    const location = useLocation();
    const movie = location.movie
    console.log(location.pathname)

    // const {movies , dispatch} = useContext(MovieContext)

    useEffect(() => {
        const getList = async () => {
            try {
                const res = await axios.get("/api/lists/type",
                    { headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken } });
                setList(res.data);
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getList();
    }, [])
    const handleDelete = (id) => {
        const deleteMovie = async () => {
            try {

                await axios.delete("/api/movies/delete/" + id,
                    { headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken } });

            } catch (err) {
                console.log(err)
            }
        }
        deleteMovie();

        // setMovies(movies.filter((items) => items.id !== id))


    }

    console.log(list)

    return (
        <div className='newList'>
            <Link to="/newList">
                <button className="newListButton">Create new list</button>
            </Link>
            <table className='movieList'>
                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        loading
                            ? (
                                <tr>
                                    <td className="spiner">
                                        <TailSpin color="blue" height="50" width="50" />
                                    </td>

                                </tr>
                            )
                            : (

                                <>

                                    {list.map((movie) => (

                                        <tr key={movie._id}>
                                            <td className='movieID'>{movie._id}</td>
                                            <td >{movie.title}</td>
                                            <td>{movie.genre}</td>
                                            <td>{movie.type}</td>
                                            <td>{movie.createdAt}</td>
                                            <td>{movie.updatedAt}</td>
                                            <td className='productListAction'>
                                                <Link
                                                    to={{ pathname: "/product/" + movie._id }}
                                                    state={movie}
                                                >
                                                    <button className='productListEdit'>Edit</button>
                                                </Link>
                                                <MdDelete className="productListDelete" onClick={() => handleDelete(movie._id)} />

                                            </td>
                                        </tr>
                                    ))

                                    }
                                </>
                            )}
                </tbody>

            </table>
            {/* <DataGrid
                // getRowId={(row) => row._id}
                rows={data} disableSelectionOnClick
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                 
            /> */}
        </div>
    )
}

export default NewList
