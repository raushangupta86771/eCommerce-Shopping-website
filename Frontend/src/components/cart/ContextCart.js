import React from 'react'
import Items from './Items';
import { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useContext } from 'react';
import { CartContext } from './Cart';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { deleteCart, getCarts } from '../../api/CartRequests.js';
import { addOrder } from '../../api/OrderRequests';
import Spinner from '../Spinner/Spinner';
import Navbar from '../Navbar/Navbar';

const ContextCart = () => {
    const [spinner, setSpinner] = React.useState(false);
    const [CartItems, setCartItems] = useState([])
    const [totalAmmountSum, settotalAmmountSum] = useState(0)
    const cartItems = useSelector((state) => state.cartReducer.items[0]);
    useEffect(() => {
        setSpinner(true);
        const url = `http://localhost:5000/cart/getItems/${localStorage.getItem('userId')}`
        try {
            axios({
                method: "get",
                url: url,
            }).then((res) => {
                setCartItems(res.data);
                let sum=0;
                res.data.map((ele)=>{
                    sum=ele.price+sum;
                })
                settotalAmmountSum(sum);
                setSpinner(false);
            })
        } catch (error) {
            console.log(error);
        }

    }, [])
    const { item } = useContext(CartContext); //globally fetching cart data from context of cart.js
    // console.log(item);

    const { removeFromState } = useContext(CartContext);

    const [flagForScroll, setflagForScroll] = useState(true);

    const initPayment = (data) => {
        const options = {
            key: process.env.KEY_ID,
            amount: data.amount,
            currency: data.currency,
            description: "Test Transaction",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifyUrl = "http://localhost:5000/cart/verify";
                    const { data } = await axios.post(verifyUrl, response);
                    console.log(data);
                    if (data.status === true) {
                        //LOGIC : step1- if payment done then finding all items from cart database by userId
                        //        step2- then store all rcvd cart data into order table
                        //        step3- delete all carts of user from database

                        // STEP 1
                        // const rcvdData = await getCarts(localStorage.getItem('userId'));
                        const cartData = CartItems;

                        // STEP 2
                        cartData.map((curentItm) => {
                            const obData = {
                                userId: curentItm.userId,
                                title: curentItm.title,
                                price: curentItm.price,
                                quantity: curentItm.quantity,
                                image: curentItm.image,
                                isPlaced:true,
                                isShipped:false,
                                isDelivered:false
                            }
                            addOrder(obData);
                        })

                        // STEP 3
                        const url = "http://localhost:5000/cart";
                        cartData.map((ele) => {
                            axios({
                                method: "delete",
                                url: url,
                                data: {
                                    id: ele._id
                                },
                                headers: { "Content-Type": "application/json" },
                            }).then((d) => {
                                removeFromState(d._id);
                                localStorage.setItem("totalPrice", 0);
                                setflagForScroll(false);
                            })
                        })
                    }
                    else {
                        alert("payment failed");
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const handlePayment = async () => {
        try {
            const orderUrl = "http://localhost:5000/cart/orders";
            const { data } = await axios.post(orderUrl, { amount: totalAmmountSum })
            initPayment(data.data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
        <Navbar/>
            <header>
                <div className="continue-shopping">
                    <Link to="/"><img src="../../../images/arrow.png" alt="arrow" className='arrow-icon' /></Link>
                    <h3>Continue shopping</h3>

                    {/* <div className='cart-icon cart-adj-icon'>
                        <img src="../../../images/cart.png" alt="cart cart-adj-img" className=''/>
                        <p>{cartItems?.length}</p>
                    </div> */}
                </div>
            </header>

            <section className='main-cart-section'>
                <h1>Shopping cart</h1>
                <p className='total-items'>You have <span className='total-items-count'>{cartItems?.length}</span> items in your cart</p>

                <div className="cart-items">
                    <div className="cart-items-container">

                        <Scrollbars>
                            {
                                spinner ? <Spinner /> :
                                    flagForScroll && CartItems.map((currItm) => {
                                        return <Items key={currItm._id} {...currItm} />
                                    })
                            }
                        </Scrollbars>

                    </div>
                </div>

                <div className="card-total">
                    <h3>Cart Total : <span>{totalAmmountSum} Rs</span></h3>
                    <button onClick={handlePayment}>Checkout</button>
                </div>
            </section>
        </>
    )
}

export default ContextCart