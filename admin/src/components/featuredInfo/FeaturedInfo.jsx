import React from 'react'
import './featuredInfo.scss'
import {MdOutlineArrowDownward, MdOutlineArrowUpward} from 'react-icons/md'
import {GrFormView} from 'react-icons/gr'

const FeaturedInfo = () => {
    return (
        <div className='featuredInfo'>
            <div className="featuredItem">
                <span className="featuredTitle revenue">Movies View</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney"><GrFormView/>2,234</span>
                    <span className="featuredMoneyRate"><GrFormView/>-11.4 <MdOutlineArrowDownward className='featuredIcon negative'/></span>

                </div>
                <div className="featuredSub">Comapare to last month</div>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle sales">Series View</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney"><GrFormView/>4,234</span>
                    <span className="featuredMoneyRate"><GrFormView/>-1.4 <MdOutlineArrowDownward className='featuredIcon negative'/></span>

                </div>
                <div className="featuredSub">Comapare to last month</div>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle cost">Total View</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney"><GrFormView/>2,234,00</span>
                    <span className="featuredMoneyRate"><GrFormView/>11.4 <MdOutlineArrowUpward className='featuredIcon positive'/></span>

                </div>
                <div className="featuredSub">Comapare to last month</div>
            </div>
        </div>
    )
}

export default FeaturedInfo
