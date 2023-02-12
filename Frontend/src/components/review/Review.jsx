import React, { useState } from 'react'
import { useEffect } from 'react';
import { getSingleProduct } from '../../api/ProductRequest';
import "./Style.css"
import { useDispatch } from "react-redux"
import { addToCart } from '../../api/CartRequests';
import { getCarts } from '../../api/CartRequests';
import { addCartItemsInLocalhost } from '../../actions/CartActions';
import { Link, useNavigate } from 'react-router-dom';
import Star from '../Product-details/rating/Star';

const Review = ({ item }) => {

    return (
        <>
            <div className="col-md-6 review_single_item">
                <div className="card my-3">
                    <div className="review_main">
                        {/* <!--Testimonials-------------------> */}
                        <section id="testimonials">

                            {/* <!--testimonials-box-container------> */}
                            <div className="testimonial-box-container">
                                {/* <!--BOX-1--------------> */}
                                <div className="testimonial-box">
                                    {/* <!--top-------------------------> */}
                                    <div className="box-top">
                                        {/* <!--profile-----> */}
                                        <div className="profile">
                                            {/* <!--img----> */}
                                            <div className="profile-img">
                                                <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" />
                                            </div>
                                            {/* <!--name-and-username--> */}
                                            <div className="name-user">
                                                <strong>{item.name}</strong>
                                                <span>@{item.userId}</span>
                                            </div>
                                        </div>
                                        {/* <!--reviews------> */}
                                        <div className="reviews">
                                            <Star rating={item.rating} />
                                        </div>
                                    </div>
                                    {/* <!--Comments----------------------------------------> */}
                                    <div className="client-comment">
                                        <p>{item.comment}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Review