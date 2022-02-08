import React from 'react'
import { useEffect } from 'react';
import {MdPlayArrow , MdAdd} from "react-icons/md"
import { BiLike , BiDislike} from "react-icons/bi"; 
import {useState} from 'react'
import './listItem.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListItem = ({index , item }) => {
    const [isHovered , setIsHovered] = useState(false);
    const [movies , setMovies] = useState({})
    // const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"

    useEffect(() => {
        
        const getMovies = async () => {
            try{
                const res = await axios.get("/api/movies/" + item,{
                    headers : {
                        token :"Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
               // console.log(res.data)
                setMovies(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getMovies()
        
    }, []);
// console.log(movies.img)
    return (
        <Link to={{pathname:"/watch/"+movies._id , movie:movies }}>
        <div key={movies._id} className='listItem' 
            style={{left : isHovered && index * 225 - 50 + index * 2.5}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
           <img src={movies.img} alt="nothing to see" />
           
           {isHovered && (
               <>
                    <video src={movies.trailer} autoPlay={true} loop></video>

                    <div className="itemInfo">
                        <div className="icons">
                            <MdPlayArrow className='icon'/>
                            <MdAdd className='icon'/>
                            <BiDislike className='icon'/>
                            <BiLike className='icon'/>
                        </div>
                        <div className="itemInfoTop">
                            <span> {movies.duration}</span>
                            <span className='limit'>+{movies.limit}</span>
                            <span> {movies.year}</span>
                        </div>
                        <div className="desc">
                            {movies.desc}
                        </div>
                        <div className="genre">{movies.genre}</div>
                
                    </div>
              </>

               )}
        </div>
        </Link>
    );
}

export default ListItem
