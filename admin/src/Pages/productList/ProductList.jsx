import React, { useEffect } from 'react'
import './productlist.scss'
import { MdDelete } from 'react-icons/md'
import { Circles, Oval, TailSpin } from 'react-loader-spinner'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

const ProductList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true)
    const location = useLocation();

    console.log(location.pathname)

    // const {movies , dispatch} = useContext(MovieContext)

    useEffect(() => {
        const getMovies = async () => {
            try {
                const res = await axios.get("/api/movies",
                    { headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken } });
                setMovies(res.data);
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getMovies();
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

        setMovies(movies.filter((items) => items.id !== id))


    }

    console.log(movies)

    return (
        <div className='productList'>
            <Link to="/newProduct">
                <button className="newMovie">Create new movie</button>
            </Link>
            <table className='movieList'>
                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Movies</th>
                        <th>Genre</th>
                        <th>Year</th>
                        <th>Limit</th>
                        <th>isSeries</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading
                            ? (
                                <tr>

                                    <td className="spiner">
                                        <TailSpin color="darkblue" height="50" width="50" />
                                    </td>
                                </tr>
                            )
                            : (


                                <>
                                    {movies.map((movie) => (


                                        <tr key={movie._id}>
                                            <td className='movieID'>{movie._id}</td>
                                            <td className='imgTitle'><img src={movie.img} className='movieImg' />{movie.title}</td>
                                            <td>{movie.genre}</td>
                                            <td>{movie.year}</td>
                                            <td>{movie.limit}</td>
                                            <td>{movie.isSeries.toString()}</td>
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

export default ProductList
