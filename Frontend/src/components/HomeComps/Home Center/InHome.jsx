import React from 'react'
import { useDispatch } from "react-redux"
import { addToCart } from '../../../api/CartRequests';
import { getCarts } from '../../../api/CartRequests';
import { addCartItemsInLocalhost } from '../../../actions/CartActions';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const InHome = ({ product, id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCartClick = (e) => {
        e.preventDefault();

        const item = {
            userId: localStorage.getItem('userId'),
            productId: product._id,
            price: product.price,
            image: product.image,
            title: product.title
        }

        addToCart(item);

        const fetchCarts = async () => {
            const rcvdData = await getCarts(localStorage.getItem('userId'));
            dispatch(addCartItemsInLocalhost(localStorage.getItem('userId')));
        }

        fetchCarts();
    }

    useEffect(() => {
        dispatch(addCartItemsInLocalhost(localStorage.getItem('userId')));
    }, [])

    const handleView = (e) => {
        e.preventDefault();
        localStorage.removeItem('viewId');
        localStorage.setItem('viewId', product._id)
        navigate(`/view/${product._id}`)
    }


    return (
        <>
            <div className="col-md-4">
                <div className="card my-3">
                    <div className="card-body justify-content-center flex-column m-auto align-items-center">
                        <img style={{ height: "15rem", width: "15rem" }} src={product.image ? process.env.REACT_APP_PUBLIC_FOLDER + product.image : ""} className="card-img-top" alt="..." />
                        <h5 className="card-title">{product.title}</h5>
                        <p>{product.price} INR</p>
                        <p className="card-text">{product.desc}</p>
                        <div className=' m-2'>
                            <a href="#" onClick={handleCartClick} className="mx-2 btn btn-success">Add to cart</a>
                            <Link to="#" className="mx-2 btn btn-success" onClick={handleView}>View</Link>
                            {/* <a href="#" className="mx-2 btn btn-primary">Go somewhere</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InHome