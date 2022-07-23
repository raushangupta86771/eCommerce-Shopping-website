import express from "express";
import { createProduct, getAllProducts, searchProduct, getProduct } from "../controller/ProductController.js"

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/search/:searchItem", searchProduct);
router.get("/getProduct/:id", getProduct);


export default router;