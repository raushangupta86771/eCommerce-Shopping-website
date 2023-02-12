import { Link } from 'react-router-dom'
import React from 'react'
import "./Footer.css"

const Footer = () => {
    return (
        <div className='Footer'>
            <footer class="footer-distributed">
                <div class="footer-left">
                    <h3>e<span>Mart</span></h3>

                    <p class="footer-links">
                        <Link to="/" className='mx-2'>Home</Link>
                        |
                        <Link to="/orders" className='mx-2'>Orders</Link>
                        |
                        <Link to="/cart" className='mx-2'>Cart</Link>
                        |
                        <Link to="/signup" className='mx-2'>Sign up</Link>
                    </p>

                    <p class="footer-company-name">Copyright © 2023 <strong>Raushan Kumar</strong> All rights reserved</p>
                </div>

                <div class="footer-center justify-content-center">
                    <div className="d-flex flex-column justify-content-start position-relative ">
                        <div className='d-flex'>
                            <i class="fa fa-phone"></i>
                            <p className='my-3'>+91 7367011637</p>
                        </div>
                        <div className='d-flex'>
                            <i class="fa fa-envelope"></i>
                            <p className='my-3'><a href="mailto:raushangupta2231@gmail.com">raushangupta2231@gmail.com</a></p>
                        </div>
                    </div>
                </div>
                <div class="footer-right">
                    <p class="footer-company-about">
                        <span>About the company</span>
                        <strong>eMart</strong> is an online marketplace that offers a wide range of products, including groceries, electronics, clothing, and more. With eMart, you can shop from the comfort of your own home and have your purchases delivered right to your doorstep.
                    </p>

                </div>
                <div class="footer-icons d-flex justify-content-center align-items-center">
                    <a target='_blank' href="https://www.facebook.com/profile.php?id=100054282862780&mibextid=ZbWKwL"><i class="fab fa-facebook"></i></a>
                    <a target='_blank' href="https://instagram.com/raushan.js?igshid=NmQ2ZmYxZjA="><i class="fab fa-instagram"></i></a>
                    <a target='_blank' href="https://www.linkedin.com/in/raushan-kumar-785167219"><i class="fab fa-linkedin"></i></a>
                    <a target='_blank' href="#"><i class="fab fa-twitter"></i></a>
                    <a target='_blank' href="https://github.com/raushangupta86771"><i class="fab fa-github"></i></a>
                </div>
            </footer>
        </div>
    )
}

export default Footer