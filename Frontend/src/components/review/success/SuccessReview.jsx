import React from 'react'
import "./Style.css"

const SuccessReview = () => {
    return (
        <div className='success-rating'>
            <div className="card-success">
                <div className='style-main'>
                    <i className='success-i'>✓</i>
                </div>
                <h1 className='success-h1'>Success</h1>
                <p className='success-p'>We have successully submites your review;<br /> Thank You!</p>
            </div>
        </div>
    )
}

export default SuccessReview