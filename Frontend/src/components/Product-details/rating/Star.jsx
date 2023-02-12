import React from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { AiOutlineStar } from "react-icons/ai"
import "./Style.css"

const Star = ({ numberOfRatings, rating }) => {

    const ratingStar = Array.from({ length: 5 }, (ele, idx) => {
        let number = idx + 0.5;

        return (
            <span key={idx}>
                {
                    rating >= idx + 1 ? (<FaStar className='icon' />)
                        : rating >= number ? (<FaStarHalfAlt className='icon' />) :
                            (<AiOutlineStar className='icon' />)
                }
            </span>
        )
    })

    return (
        <div>
            <div className="icon-style">
                {ratingStar}
            </div>
        </div>
    )
}

export default Star