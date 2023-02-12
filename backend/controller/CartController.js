import mongoose from "mongoose";
import CartModel from "../models/CartModel.js"
import Razorpay from "razorpay";
import crypto from "crypto";


// Creat new Cart item
export const createCart = async (req, res) => {
    const newCart = new CartModel(req.body);

    try {
        await newCart.save();
        res.status(200).json(newCart);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

// update Cart item
export const updateCart = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await CartModel.findById(postId);
        await post.updateOne({ $set: req.body });
        res.status(200).json("Post Updated");
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

//get all carts
export const getCarts = async (req, res) => {
    const id = req.params.id;
    try {
        const carts = await CartModel.find({ userId: id });
        res.status(200).json(carts);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

//delete one cart
export const deleteCart = async (req, res) => {
    const id = req.body.id;
    try {
        const cart = await CartModel.findById(id);
        if (cart) {
            await cart.deleteOne();
            res.status(200).json({ msg: "cart deleted successfully with " });
        }
        else {
            res.status(200).json({ msg: "No cart found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

//get cart by userId
export const getCartsById = async (req, res) => {
    const userId = req.body.id;
    console.log(userId)
    try {
        const carts = await CartModel.find({ userId });
        res.status(200).json(carts);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};


//for order payment
export const order = async (req, res) => {
    const amount = parseInt(req.body.amount)
    try {
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.SECRET_KEY,
        });

        const options = {
            amount: amount*100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };
        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}

//payment verify
export const verify = async (req, res) => {
    let status = false;
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.SECRET_KEY)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            status = true;
            return res.status(200).json({ message: "Payment verified successfully", status });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!", status });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!", status });
        console.log(error);
    }
}