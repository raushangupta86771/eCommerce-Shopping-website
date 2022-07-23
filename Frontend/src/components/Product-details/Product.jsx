import React, { useState } from 'react'
import { useEffect } from 'react';
import { getSingleProduct } from '../../api/ProductRequest';
import "./css/all.min.css"
import "./Style.css"
import Nomos1 from "./Images/Nomos1.webp"
import Nomos2 from "./Images/Nomos2.webp"
import Nomos3 from "./Images/Nomos3.webp"

const Product = () => {
    const productId = window.location.pathname; //getting url after domain name
    const str = productId.slice(6) //getting all data after 6 characher i.e actual product id

    const [productDetails, setProduct] = useState([]);

    useEffect(() => {

        const perform = async () => {
            const productDetail = await getSingleProduct(str);
            // console.log(productDetail.data)
            setProduct(productDetail.data.product)
        }

        perform();
    })

    useEffect(() => {
        // Navigate product images 

        const BigImage = document.getElementById('big-image');
        const imgSlider = document.getElementById('img-slider');

        imgSlider.addEventListener('click', event => {

            if (event.target === Nomos1) {
                BigImage.setAttribute("src", Nomos1);
            }

            else if (event.target === Nomos2) {
                BigImage.setAttribute("src", Nomos2);
            }

            else {
                BigImage.setAttribute("src", Nomos3);
            }

        });



        // Navigate information 

        const chooseInfo = document.getElementById('more-infos');
        const choose = document.getElementsByClassName('choose');
        const paragraph = document.getElementsByClassName('paragraph');


        function styleItem(a, b, c) {
            a.style.cssText = 'color:black ; border-bottom: 2px solid black ; padding-bottom: 6px';
            b.style.cssText = 'color:gray ; border-bottom: none';
            c.style.cssText = 'color:gray ; border-bottom: none';
        }

        function displayPrph(e, f, g) {
            e.style.display = 'block';
            f.style.display = 'none';
            g.style.display = 'none';
        }

        chooseInfo.addEventListener('click', event => {

            if (event.target === choose[0]) {

                styleItem(choose[0], choose[1], choose[2])
                displayPrph(paragraph[0], paragraph[2], paragraph[1])
            }

            else if (event.target === choose[1]) {

                styleItem(choose[1], choose[0], choose[2])
                displayPrph(paragraph[1], paragraph[0], paragraph[2])
            }

            else {
                styleItem(choose[2], choose[0], choose[1])
                displayPrph(paragraph[2], paragraph[0], paragraph[1])
            }
        });

        // add items to the cart

        const addToCart = document.getElementById('add-to-cart');
        const itemsAdded = document.getElementById('items-added');
        const counter = document.getElementById('counter');

        addToCart.addEventListener('click', ev => itemsAdded.textContent = (counter.value));
    })

    return (
        <>
            <div className="container">

                <div className="card">
                    <div id="shopping">
                        <i className="fas fa-cart-plus"><sup id="items-added"></sup></i>
                    </div>
                    <div className="images">
                        <h2>NOMOS LUX Glashütte</h2>
                        <div className="slider"><img id="big-image" alt="" /></div>
                        <div id="img-slider" className="img-slider">
                            <div className="imgs"><img id="Nomos1" src={Nomos1} alt="" /></div>
                            <div className="imgs"><img id="Nomos2" src={Nomos2} alt="" /></div>
                            <div className="imgs"><img id="Nomos3" src={Nomos3} alt="" /></div>
                        </div>
                    </div>
                    <div className="infos">
                        <h1>NOMOS LUX Glashütte</h1>
                        <div className="reviews">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                        <div className="price">
                            <h3>2100$</h3>
                            <h3>2350$</h3>
                        </div>
                        <div id="more-infos">
                            <h5 className="choose">Description</h5>
                            <h5 className="choose">Basic Info</h5>
                            <h5 className="choose">Caliber</h5>
                        </div>
                        <div id="info-content">
                            <p className="paragraph" style={{ "display": "block" }}>The watch comes with the original Nomos black Cordovan Shell strap and with the original Nomos 18kt white gold tang buckle. This timepiece is sourced directly from Nomos, hence please allow one week delivery time (often within days).</p>
                            <p className="paragraph" style={{ "display": "none" }}>CALIBER DUW 2002 manual <br /> MOVEMENT HEIGHT 3.6 mm <br /> DIAMETER 32.6 by 22.6 mm <br /> POWER RESERVE up to 84 hours <br /> JEWELS 23</p>
                            <p className="paragraph" style={{ "display": "none" }}>Lorem Repellendus ullam odit placeat, non rem eaque. ipsum dolor sit amet consectetur adipisicing elit. Repellendus Repellendus ullam odit placeat, non rem eaque.ullam odit placeat, non rem eaque.</p>
                        </div>
                        <div className="quantity">
                            <h3>QUANTITY</h3>
                            <input type="number" name="items" id="counter" min="1" value="1" />
                        </div>
                        <div className="buttons">
                            <button id="add-to-cart"><i className="fas fa-shopping-cart"></i>ADD TO CART</button>
                            <button>BUY NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product