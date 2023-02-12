import express from "express";
import { newCono,getConvoById,getUserInfoForChat } from "../controller/ChatContrller.js"

const router = express.Router();

router.post("/", newCono);
router.get("/:userId", getConvoById);
router.get("/", getUserInfoForChat);


export default router;