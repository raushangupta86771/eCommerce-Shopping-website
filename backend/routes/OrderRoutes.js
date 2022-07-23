import express from "express";
import { addOrder, getOrdersById } from "../controller/OrdersController.js"

const router = express.Router();

router.post("/", addOrder);
router.get("/getById/:id", getOrdersById);


export default router;