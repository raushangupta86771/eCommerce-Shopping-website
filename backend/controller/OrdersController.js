import mongoose from "mongoose";
import OrderModel from "../models/OrderModel.js"


// Creat new Cart item
export const addOrder = async (req, res) => {
    const newCart = new OrderModel(req.body);

    try {
        await newCart.save();
        res.status(200).json(newCart);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

//get cart by userId
export const getOrdersById = async (req, res) => {
    const userId = req.params.id;
    try {
        const carts = await OrderModel.find({ userId });
        res.status(200).json(carts);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};