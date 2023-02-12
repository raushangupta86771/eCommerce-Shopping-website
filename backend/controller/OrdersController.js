import mongoose from "mongoose";
import OrderModel from "../models/OrderModel.js"


// Creat new Cart item
export const addOrder = async (req, res) => {
    const newCart = new OrderModel(req.body);
    console.log("adding order...")

    try {
        await newCart.save();
        console.log("added order")
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

//get all orders (only for admin)
export const getAllOrders = async (req, res) => {
    try {
        const carts = await OrderModel.find();
        res.status(200).json(carts);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};


//update order details by its id
export const updateOrder = async (req, res) => {
    try {
        const carts = await OrderModel.findById(req.body.orderId);
        await carts.updateOne({ isDelivered: req.body.isDelivered, isShipped: req.body.isShipped, isPlaced: req.body.isPlaced });
        res.status(200).json("order Updated");
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};