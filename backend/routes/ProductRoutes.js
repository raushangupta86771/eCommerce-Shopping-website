import express from "express";
import { createProduct, getAllProducts, searchProduct, getProduct,addReview,fetchReviews } from "../controller/ProductController.js"

const router = express.Router();

router.post("/", createProduct);
// router.get("/:min_range/:max_range", getAllProducts);
router.get("/search/:searchItem", searchProduct);
router.get("/getProduct/:id", getProduct);
router.post("/addReview", addReview);
router.get("/fetchReviews/:id", fetchReviews);


export default router;