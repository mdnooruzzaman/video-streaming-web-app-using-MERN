import React from 'react'
import {useState , useEffect} from 'react'
import Featured from '../../components/Featured'
import Navbar from '../../components/Navbar';
import List from '../../components/List'
import './home.scss';
import axios from 'axios'

const Home = ({type}) => {
    const [lists , setLists] = useState([]);
    const [genre , setGenre] = useState(null);


    useEffect(() => {
        console.log(type)
       
        const getRandomList = async () => {
            try{
                const res = await axios.get(`/api/lists/type${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
                    headers : {
                        token :"Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
                    }
                }

                );
                setLists(res.data);
                console.log(res.data)
                console.log("not")
            }catch(err){
                console.log(err)
            }
        };
        getRandomList();
       
    }, [type , genre]);
    return (
        <div className='home'>
            <Navbar/>
            <Featured type={type} genre={setGenre}/>
            {
                lists.map((list) => (
                    
                    <List key={list._id} list = {list}/>
           ))
            }
            

        </div>
    )
}

export default Home
