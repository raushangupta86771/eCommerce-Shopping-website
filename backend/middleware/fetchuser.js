
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const fetchuser = (req, res, next) => {
    //Get the user from the JWT token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Pleasee authenticate a valid user token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; //here we got a object. and inside object we got the id of user
        next(); // this nex() is compulsory
    }
    catch (e) {
        res.status(401).send({ error: "Server Error" });
    }
}
