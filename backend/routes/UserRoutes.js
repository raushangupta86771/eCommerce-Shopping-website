import express from "express";
import { createUser, loginUser, getUser, getUserByMonth } from "../controller/UserController.js"
import { fetchuser } from "../middleware/fetchuser.js"

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/getUser", fetchuser, getUser);
router.get("/getUserByMonth", getUserByMonth);


export default router;