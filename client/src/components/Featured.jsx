import axios from 'axios';
import { useEffect , useState } from 'react';
import React from 'react'
import {MdPlayArrow , MdOutlineInfo} from "react-icons/md"
import './featured.scss'

const Featured = ({ type }) => {
    const [content , setContent] = useState({});

    useEffect(() => {
        const getRandomContent = async () => {
            try{
                console.log(type)
                const res = await axios.get(`/api/movies/random?type=${type}`);
                setContent(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        getRandomContent();
    }, [])
    console.log(content)
    return (
        <div className='featured'>
            { type && (
                <div className="category">
                    <span>{type === "movie" ? "Movie" : "Series"}</span>
                    <select name="genre" id="genre">
                        <option value="">Genre</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                        <option value="Animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>
                    </select>
                </div>
            )}
            {/* //"https://cdn.vox-cdn.com/thumbor/Hs6V8n_DMCblvrcOtzB-lSlqJOw=/0x0:6240x4160/1200x675/filters:focal(2621x1581:3619x2579)/cdn.vox-cdn.com/uploads/chorus_image/image/66479422/UNF_UNIT_025.323.jpg" */}
            <img width="100%"src="https://cdn.vox-cdn.com/thumbor/Hs6V8n_DMCblvrcOtzB-lSlqJOw=/0x0:6240x4160/1200x675/filters:focal(2621x1581:3619x2579)/cdn.vox-cdn.com/uploads/chorus_image/image/66479422/UNF_UNIT_025.323.jpg" alt="nothing to see now" />
            <div className="info">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyo0pQaVqGuA4iiGYKX6UUu5v-OHO0TacVA_--2bwf6adGyFi0KrXlQWrzFJmOuV-qHg&usqp=CAU" alt="nothing to see" />
                <span className='desc'>Ruth Slater, a woman released from prison after serving a sentence for a violent crime and attempts to re-enter society. She must try to put her life back together again in a world that refuses to forgive her past.</span>
                <div className="buttons">
                    <button className="play"><MdPlayArrow/>
                         <span>Play</span>
                    </button>
                    <button className="more"><MdOutlineInfo/>
                         <span>info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured
