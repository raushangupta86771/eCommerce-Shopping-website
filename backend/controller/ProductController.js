import mongoose from "mongoose";
import ProductModel from "../models/ProductModel.js"

// Creat new Product
export const createProduct = async (req, res) => {
    const newProduct = new ProductModel(req.body);

    try {
        await newProduct.save();
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};


// Creat new Product
export const getAllProducts = async (req, res) => {

    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

//search product
export const searchProduct = async (req, res) => {
    var regex = new RegExp(req.params.searchItem, 'i');
    const rcvdItem = await ProductModel.find({ title: regex });
    try {
        if (rcvdItem.length < 1) {
            return res.json({ data: rcvdItem, success: false });
        }
        else {
            return res.json({ data: rcvdItem, success: true });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

//get product by its id
export const getProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            res.json({ success: false, product })
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};