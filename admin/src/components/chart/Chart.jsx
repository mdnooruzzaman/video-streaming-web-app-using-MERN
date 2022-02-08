import React from 'react'
import './chart.scss';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip,  ResponsiveContainer } from 'recharts';

const Chart = ({title, data , dataKey }) => {
    
    return (
        <div className='chart'>
           <h3 className="chartTitle">
               {title}
           </h3>
           <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke='#555bde'/>
                    <Line type="monotone" dataKey={dataKey} stroke='#555bde'/>
                    <Tooltip/>
                    <CartesianGrid stroke='#e0dfdf' strokeDasharray={5 , 5}/>
                </LineChart>
           </ResponsiveContainer>
        </div>
    )
}

export default Chart
