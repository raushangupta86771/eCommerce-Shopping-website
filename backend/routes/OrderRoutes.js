import express from "express";
import { addOrder, getOrdersById,getAllOrders,updateOrder } from "../controller/OrdersController.js"

const router = express.Router();

router.post("/", addOrder);
router.get("/getById/:id", getOrdersById);
router.get("/getAllOrders", getAllOrders);
router.put("/updateOrder", updateOrder);


export default router;