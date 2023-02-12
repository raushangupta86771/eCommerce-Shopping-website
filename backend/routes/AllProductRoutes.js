import express from "express";
import { createProduct, getAllProducts, searchProduct, getProduct,addReview,fetchReviews } from "../controller/ProductController.js"

const router = express.Router();


router.get("/:min_range/:max_range", getAllProducts);


export default router;