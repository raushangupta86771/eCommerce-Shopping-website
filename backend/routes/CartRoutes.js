import express from "express";
import { createCart, updateCart, getCarts, deleteCart, getCartsById, order, verify } from "../controller/CartController.js"

const router = express.Router();

router.post("/", createCart);
router.put("/update/:id", updateCart);
router.get("/getItems/:id", getCarts);
router.delete("/", deleteCart);
router.get("/userCart", getCartsById);
router.post("/orders", order);
router.post("/verify", verify);
// router.get("/",getAllProducts);


export default router;