import React from 'react'
import  ListItem  from './listItem'
import { useRef , useState } from 'react'
import './lists.scss'
import {MdArrowBackIosNew , MdArrowForwardIos} from "react-icons/md"


const List = ({list}) => {
    const [isMoved , setIsMoved] = useState(false);
    const [slidNumber , setSlidNumber] = useState(0)
  
   const listRef = useRef();

    const handleClick = (direction) => {
        setIsMoved(true)
        let distance = listRef.current.getBoundingClientRect().x - 50
        if(direction === "left" && slidNumber>0){
            setSlidNumber(slidNumber - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`
        }
        if(direction === "right" && slidNumber <5) {
            setSlidNumber(slidNumber + 1)
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
        }
        console.log(distance)
    }
    return (
        <div className='list'>
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <MdArrowBackIosNew className='arrowSlider left' onClick={() => handleClick("left")}
                    style={{display: !isMoved && "none"}}
                />
                <div className="container" ref={listRef}>
                    {
                        list.content.map((item , i) => (

                            < ListItem key={i} index={i} item={item}/>
                        ))
                    }
                    

                </div>
                <MdArrowForwardIos className='arrowSlider right' onClick={() => handleClick("right")}/>
            </div>

        </div>
    );
}

export default List
