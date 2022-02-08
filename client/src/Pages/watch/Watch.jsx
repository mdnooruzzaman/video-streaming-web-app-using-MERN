import axios from 'axios'
import  { useEffect, useState } from 'react'
import {MdArrowBack} from "react-icons/md"
import { Link, useLocation, useParams } from 'react-router-dom'

import './watch.scss'

const Watch = () => {
    const [movie , setMovie] = useState([])
    const prams = useParams();
    const id = prams.watchId;
    
    useEffect(() => {
        const getMovies = async (id)=>{
            try{
                const res = await axios.get('/api/movies/'+id);
                console.log(res.data)
                setMovie(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getMovies(id)
    }, [])

    return (
        <div className='watch'>
            <Link to="/">
            <div className="back">
                <MdArrowBack/>
                Home
            </div>
            </Link>
            <video 
            
            className='video'
            src={movie.video}
            autoPlay progress="true" controls 
            >

            </video>
            <div className="wrapIt">
                
                <h1 className='titleWatch'>{movie.title}</h1>

                <div className="wrapUpload">

                    <span className="created">Uploaded at</span>
                    <span className="date">{movie.createdAt}</span>
                </div>
                <div className="descWrap">

                    <span className='descHeading'>Description</span>
                    <span className="desc">{movie.desc}</span>
                </div>
            </div>
        </div>
    )
}

export default Watch
