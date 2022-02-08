import { useState, useEffect } from 'react'
import './createnewlist.scss'
import SuccessAlert from '../../components/successAlert/SuccessAlert';
import axios from 'axios';


const CreateNewList = () => {
    const [toggel, setToggel] = useState(true)
    const [movie, setMovie] = useState(null);
    const [movies, setMovies] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value })
    }



    //submit to the database

    const handleSubmit = (e) => {
        e.preventDefault(e)
        const createMovie = async (movie) => {
            try {
                const res = await axios.post('/api/lists', movie,
                    { headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken } }
                );
                console.log(`successfull ${res.data}`)
                setToggel(false)

            } catch (err) {
                console.log(err)
            }
        }
        createMovie(movie)
    }
    //get movies from database
    useEffect(() => {
        const getMovies = async () => {
            try {
                const res = await axios.get("/api/movies",
                    { headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken } });
                setMovies(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getMovies();
    }, [])

    const handleSelect = (e) => {
        let value = Array.from(e.target.selectedOptions, (option) => option.value);
        setMovie({ ...movie, [e.target.name]: value });
        console.log(value)
    }

    console.log(movie);
    console.log(movies)

    const handleClick = () => {
        setToggel(true)
    }

    return (
        <div className='newProduct'>
            {toggel ? (<div></div>) : (<div><SuccessAlert crossClick={handleClick} /></div>)}
            <h1 className="addProductTitle">New List</h1>
            <form className="addProductForm">



                <div className="addProductItem">
                    <label>Title</label>
                    <input type="text" placeholder="List Title" name='title' onChange={handleChange} />
                </div>

                <div className="addProductItem">
                    <label>Type</label>
                    <select name='type' onChange={handleChange}>
                        <option >Type</option>
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                    </select>
                </div>
                <div className="addProductItem">
                    <label>Genre</label>
                    <input type="text" placeholder="genre" name='genre' onChange={handleChange} />
                </div>
                <div className='addProductItem'>
                    <span>Select movie/series </span>
                    <select multiple name='content' className='typeSelect' onChange={handleSelect}>
                        {
                            movies.map((m) => (
                                <option key={m._id} value={m._id}>
                                    {m.title}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button className="addProductButton" onClick={handleSubmit}>Create List</button>

            </form>
        </div>
    )
}

export default CreateNewList
