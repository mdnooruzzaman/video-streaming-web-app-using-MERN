import React from 'react'
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import './home.scss'
import {useState , useEffect , useMemo} from 'react';
import axios from 'axios'


const Home = () => {
    const MONTHS = useMemo(() => 
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],[]
    )
    const [userStats , setUserStats] = useState([]);
    useEffect(() => {
      const getStats = async () => {
        try{
          const res = await axios.get('/api/user/stats' , {headers : {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
          }})
          const statList = res.data.sort(function (a,b) {
              return a._id - b._id;
          })
          console.log(res.data)
          statList.map(items => setUserStats((prev) => [...prev , {name: MONTHS[items._id-1] , "New User":items.total}]))
        }catch(err){
          console.log(err)
        }
      }
      getStats();
    }, [MONTHS])
    console.log(userStats)
    return (
        <div className='home'>
            <FeaturedInfo/>
            <Chart data={userStats} title={"User Analytics"} grid dataKey="New User"/>
            <div className='homeWidget'>
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
    )
}

export default Home
