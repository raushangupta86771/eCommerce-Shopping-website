import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { addToCart } from '../../../api/CartRequests';
import { getCarts } from '../../../api/CartRequests';
import { addCartItemsInLocalhost } from '../../../actions/CartActions';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./InHome.css"
import Star from '../../Product-details/rating/Star';
import axios from 'axios';
import { getSingleProduct } from '../../../api/ProductRequest'
import Spinner from '../../Spinner/Spinner';

const InHome = ({ product, id }) => {
    const [spinner, setSpinner] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [productDetails, setProduct] = useState([]);

    const [reviewList, setReviewList] = useState([]);

    const [numberOfRatings, setNumberOfRatings] = useState(null);
    const [rating, setRating] = useState(0);

    const handleCartClick = (e) => {
        setSpinner(true);
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
            console.log(rcvdData)
            dispatch(addCartItemsInLocalhost(localStorage.getItem('userId')));
            setSpinner(false);
        }
        fetchCarts();
        setSpinner(false);
        navigate("/cart")
        window.location.reload();
    }

    useEffect(() => {

        const url = "http://localhost:5000/product/fetchReviews";
        try {
            axios({
                method: "get",
                url: url + "/" + product._id,
                data: {
                    id: product._id
                },
                headers: { "Content-Type": "application/json" },
            }).then((d) => {
                setReviewList(d.data)
                let ratingNumberCount = d.data.length;
                setNumberOfRatings(ratingNumberCount)
                let sum = 0;
                d.data.map((ele) => {
                    sum = sum + ele.rating
                })
                setRating(sum / ratingNumberCount)
            }).
                catch((e) => {
                    console.log(e);
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleView = (e) => {
        e.preventDefault();
        localStorage.removeItem('viewId');
        localStorage.setItem('viewId', product._id)
        navigate(`/view/${product._id}`)
    }


    return (
        <>
            {
                spinner ? <Spinner /> :
                    <div className="col-md-4 ">
                        <div className="card my-3 adj-crd">
                            <div className=" card-body justify-content-center flex-column m-auto align-items-center inner-detial">
                                <div className="pro-img-main">
                                    <img style={{ height: "15rem", width: "15rem" }} src={product.image ? process.env.REACT_APP_PUBLIC_FOLDER + product.image : ""} className="card-img-top" alt="..." />
                                </div>
                                <h5 className="card-title my-2">{product.title}</h5>
                                <p>{product.price} INR</p>

                                <Star rating={rating} numberOfRatings={numberOfRatings} />

                                <p className="card-text adjust-product">{product.desc}</p>

                                <div className=' m-2'>
                                    <a href="#" onClick={handleCartClick} className="mx-2 add-to-cart-btn1">Add to cart</a>
                                    <Link to="#" className="mx-2  add-to-cart-btn2" onClick={handleView}>View</Link>
                                    {/* <a href="#" className="mx-2 btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default InHome