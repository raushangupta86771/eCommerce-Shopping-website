import React from 'react'

const InOrder = ({ product, id }) => {
    return (
        <>
            <div className="col-md-6">
                <div className="card my-3">
                    <div className="card-body justify-content-center flex-column m-auto align-items-center">
                        <img style={{ height: "15rem", width: "15rem" }} src={product.image ? process.env.REACT_APP_PUBLIC_FOLDER + product.image : ""} className="card-img-top" alt="..." />
                        <h5 className="card-title">{product.title}</h5>
                        <p>{product.price} INR</p>
                        <p className="card-text">Quantity {product.quantity}</p>
                        <p className="card-text">Order Id <span className='productId'>{product._id}</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InOrder