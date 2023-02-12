import React, { useState } from 'react'
import { useEffect } from 'react';
import { getSingleProduct } from '../../api/ProductRequest';
import "./Style.css"
import { useDispatch } from "react-redux"
import { addToCart } from '../../api/CartRequests';
import { getCarts } from '../../api/CartRequests';
import { addCartItemsInLocalhost } from '../../actions/CartActions';
import { Link, useNavigate } from 'react-router-dom';
import Review from '../review/Review';
import PostReview from '../review/post review/PostReview';
import axios from 'axios';
import Star from './rating/Star';
import Navbar from '../Navbar/Navbar';
import Spinner from '../Spinner/Spinner';;


const Product = () => {
    const [spinner, setSpinner] = React.useState(true);
    const productId = window.location.pathname; //getting url after domain name
    const str = productId.slice(6) //getting all data after 6 characher i.e actual product id

    const [productDetails, setProduct] = useState([]);

    const [reviewList, setReviewList] = useState([]);

    const [numberOfRatings, setNumberOfRatings] = useState(null);
    const [rating, setRating] = useState(null);


    useEffect(() => {
        const perform = async () => {
            const itemDetail = await getSingleProduct(str);
            setProduct(itemDetail.data.product)
            setSpinner(false);
            // console.log(itemDetail.data.product);
        }
        perform();


        const url = "http://localhost:5000/product/fetchReviews";
        try {
            axios({
                method: "get",
                url: url + "/" + str,
                data: {
                    id: str
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


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCartClick = (e) => {
        e.preventDefault();

        const item = {
            userId: localStorage.getItem('userId'),
            productId: productDetails._id,
            price: productDetails.price,
            image: productDetails.image,
            title: productDetails.title
        }

        addToCart(item);

        const fetchCarts = async () => {
            const rcvdData = await getCarts(localStorage.getItem('userId'));
            console.log(rcvdData)
            dispatch(addCartItemsInLocalhost(localStorage.getItem('userId')));
        }

        fetchCarts();
    }

    useEffect(() => {
        dispatch(addCartItemsInLocalhost(localStorage.getItem('userId')));
    }, [])


    return (
        <>
            <Navbar />
            {
                spinner ? <Spinner /> :
                    <div className="detail_body">
                        <div className="container">
                            <div className="card-product">
                                <div className="container-fliud">
                                    <div className="wrapper row">
                                        <div className="preview col-md-6">

                                            <div className="preview-pic tab-content">
                                                <div className="tab-pane active" id="pic-1"><img className="img_tag" src={productDetails.image ? process.env.REACT_APP_PUBLIC_FOLDER + productDetails.image : ""} /></div>
                                                <div className="tab-pane" id="pic-2"><img className="img_tag" src="http://placekitten.com/400/252" /></div>
                                                <div className="tab-pane" id="pic-3"><img className="img_tag" src="http://placekitten.com/400/252" /></div>
                                                <div className="tab-pane" id="pic-4"><img className="img_tag" src="http://placekitten.com/400/252" /></div>
                                                <div className="tab-pane" id="pic-5"><img className="img_tag" src="http://placekitten.com/400/252" /></div>
                                            </div>

                                        </div>
                                        <div className="details col-md-6">
                                            <h3 className="product-title">{productDetails.title}</h3>
                                            <div className="rating">
                                                <div className="stars">
                                                    <Star rating={rating} numberOfRatings={numberOfRatings} />
                                                </div>
                                                <span className="review-no">{numberOfRatings} reviews</span>
                                            </div>
                                            <p className="product-description">{productDetails.desc}</p>
                                            <h4 className="price">current price: <span>{" " + productDetails.price} Rs</span></h4>
                                            <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
                                            {/* <h5 className="sizes">sizes:
                                        <span className="size" data-toggle="tooltip" title="small">s</span>
                                        <span className="size" data-toggle="tooltip" title="medium">m</span>
                                        <span className="size" data-toggle="tooltip" title="large">l</span>
                                        <span className="size" data-toggle="tooltip" title="xtra large">xl</span>
                                    </h5> */}
                                            {/* <h5 className="colors">colors:
                                        <span className="color orange not-available" data-toggle="tooltip" title="Not In store"></span>
                                        <span className="color green"></span>
                                        <span className="color blue"></span>
                                    </h5> */}
                                            <div className="action">
                                                <button className="add-to-cart btn btn-default" type="button" onClick={handleCartClick}>add to cart</button>
                                                <button className="like btn btn-default" type="button"><span className="fa fa-heart"></span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
            }
            <div className="container-fluid">
                <PostReview />

            </div>
            <div className="container-fluid">
                <div className='row'>
                    <div className='col-12 mx-auto'>
                        <div className="row">
                            {
                                reviewList.map((curr) => {
                                    return <Review item={curr} key={curr._id} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product