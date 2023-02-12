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
        var minNum = parseInt(req.params.min_range)
        var maxNum = parseInt(req.params.max_range)
        // console.log(minNum)
        // return
        if (isNaN(minNum) || isNaN(maxNum)) {
            return;
        }
        const products = await ProductModel.find({ price: { $gte: req.params.min_range, $lte: req.params.max_range } });
        // return;
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};


// fetch the all review of a particular product
export const fetchReviews = async (req, res) => {
    try {
        console.log(req.body.id)
        const products = await ProductModel.findById(req.params.id);
        // products.review.sort();
        products.review.reverse();
        res.status(200).json(products.review);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

//add review into a product
export const addReview = async (req, res) => {
    try {
        const products = await ProductModel.findById(req.body.id);
        await products.updateOne({
            $push: {
                review: {
                    name: req.body.name,
                    userId: req.body.userId,
                    rating: req.body.rating,
                    comment: req.body.comment
                }
            }
        })
        await products.updateOne({
            $push: {
                usersReview: req.body.userId
            }
        })
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
    console.log(req.params.searchItem)
    console.log("hello")
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