import React from 'react'
import "./cart.css"
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { useReducer } from 'react';
import ContextCart from './ContextCart';
import { reducer } from "./reducer"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext();

const Cart = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/signup")
        }
    }, [])

    const cartProducts = useSelector((state) => state.cartReducer.items)


    const initialstate = {
        item: cartProducts,
        totalAmmount: 0,
        totalItem: 0,
    }


    const [state, dispatch] = useReducer(reducer, initialstate);

    // to delete the individual elements from cart 
    const removeFromState = (id) => {
        return dispatch({
            type: "REMOVE_ITEM",
            payload: id,
        })
    }


    return (
        // we can globally use bellow data in any component, only have to pass component 
        <CartContext.Provider value={{ ...state, removeFromState }}>
            <ContextCart />
            {/* above we are passing data in ContextCart.js  */}
        </CartContext.Provider>
    )
}

export default Cart