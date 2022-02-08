import React from 'react'
import './successalert.scss'
import {MdOutlineCancel , MdInfoOutline} from 'react-icons/md'
const SuccessAlert = (props) => {
    return (
        <div className="success">

        <div className='successAlert'>
            <span className="info"><MdInfoOutline/> Uploaded Successfully.....</span>
            <MdOutlineCancel onClick={props.crossClick} className='iconSuccess'/>
        </div>
        </div>
    )
}

export default SuccessAlert
