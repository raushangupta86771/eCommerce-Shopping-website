import React from 'react'
import { deleteCart, updateCart } from '../../api/CartRequests'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItemsInLocalhost } from '../../actions/CartActions'
import { useContext } from 'react'
import { CartContext } from './Cart'
import { useEffect } from 'react'
import { useState } from 'react'
import "./cart.css"

const Items = ({ _id, userId, title, productId, quantity, price, image }) => {

    const { removeFromState } = useContext(CartContext);

    const [total, setTotal] = useState(0);

    const dispatch = useDispatch();

    const cartProducts = useSelector((state) => state.cartReducer.items[0])

    const handleDelete = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/cart";
        try {
            const response = await axios({
                method: "delete",
                url: url,
                data: {
                    id: _id
                },
                headers: { "Content-Type": "application/json" },
            }).then((d) => {
                dispatch(addCartItemsInLocalhost(localStorage.getItem('userId')));
                removeFromState(_id);
                window.location.reload();
            }).
                catch((e) => {
                    console.log(e);
                })
        } catch (error) {
            console.log(error)
        }
    }



    const handleIncrement = async () => {
        const firstPrice = price / quantity;
        const url = `http://localhost:5000/cart/update/${_id}`;
        try {
            const response = await axios({
                method: "put",
                url: url,
                data: {
                    id: localStorage.getItem('userId'),
                    quantity: quantity + 1,
                    price: price + firstPrice
                },
                headers: { "Content-Type": "application/json" },
            }).then((d) => {
                dispatch(addCartItemsInLocalhost(localStorage.getItem('userId')));
                window.location.reload();
            }).
                catch((e) => {
                    console.log(e);
                })
        } catch (error) {
            console.log(error);
        }
    }

    const handleDecrement = async () => {
        if (quantity > 1) {
            const firstPrice = price / quantity;
            console.log(firstPrice)
            const url = `http://localhost:5000/cart/update/${_id}`;
            try {
                const response = await axios({
                    method: "put",
                    url: url,
                    data: {
                        id: localStorage.getItem('userId'),
                        quantity: quantity - 1,
                        price: price - firstPrice
                    },
                    headers: { "Content-Type": "application/json" },
                }).then((d) => {
                    dispatch(addCartItemsInLocalhost(localStorage.getItem('userId')));
                    window.location.reload();
                }).
                    catch((e) => {
                        console.log(e);
                    })
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        let sum = 0;
        cartProducts?.map((e) => {
            sum = sum + e.price;
            localStorage.setItem('totalPrice', sum)
        })
        // console.log(localStorage.getItem("totalPrice"))
    }, cartProducts)



    return (
        <>
            <div className="items-info">
                <div className="product-img">
                    <img src={image ? process.env.REACT_APP_PUBLIC_FOLDER + image : ""} alt="" />
                </div>

                <div className="title">
                    <h2>{title}</h2>
                    <p>black color</p>
                </div>

                <div className="add-minus-quantity">
                    <i className='fas fa-minus minus' onClick={handleDecrement} ></i>
                    <input type="text" value={quantity} />
                    <i className='fas fa-plus add' onClick={handleIncrement}></i>
                </div>

                <div className="price">
                    <h3>{price} Rs</h3>
                </div>

                <div className="remove-item">
                    <i className='fas fa-trash-alt remove' onClick={handleDelete}></i>
                </div>
            </div>
            <hr />
        </>
    )
}

export default Items