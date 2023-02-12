import React from 'react'
import Track_status from './Track_status/Track_status'
import { useEffect, useState } from 'react'
import axios from 'axios';

const InOrder = ({ product, id }) => {



    return (
        <>
            <div className="col-md-6 ">
                <div className="card my-3 adj-crd" style={{width: "25rem" }}>
                    <div className="card-body justify-content-center flex-column m-auto align-items-center">
                        <img style={{ height: "15rem", width: "15rem" }} src={product.image ? process.env.REACT_APP_PUBLIC_FOLDER + product.image : ""} className="card-img-top" alt="..." />
                        <h5 className="card-title">{product.title}</h5>
                        <p>{product.price} INR</p>
                        <p className="card-text">Quantity {product.quantity}</p>
                        <p className="card-text">Order Id <span className='productId'>{product._id}</span></p>
                    </div>
                    <div className="container">
                        <Track_status productData={product} productId={id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default InOrder