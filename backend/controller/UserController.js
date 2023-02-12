import mongoose from "mongoose";
import UserModel from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


// Creat new Cart item
export const createUser = async (req, res) => {
    let success = false;
    let exist = 0;

    try {
        let checkuser = await UserModel.findOne({ email: req.body.email });
        if (checkuser) { //if user exists then we will send email exixts msg
            exist = 1;
            return res.status(400).json({ error: "Sorry the email already exists !!", exist, success });
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt); //password will hash here
        let user = await UserModel.create({ //saving data in mongo
            name: req.body.name,
            password: secPassword,  //secPassword is a variable
            email: req.body.email
        })

        //creating token for user and in future we will verify with the generated token
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET); //here token generated
        console.log(authToken);

        success = true;
        res.json({ success, authToken, user }); //sending token to user
        // catch (err=> { console.log(err) }) //this will print error on console
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};



export const loginUser = async (req, res) => {
    const email = req.body.email;
    const paswword = req.body.password;
    // let success=true;
    try {
        let user = await UserModel.findOne({ email });  //matching wether user exists or not. 1st is database email and 2nd is user filled email

        if (!user) //if user does not exist
        {
            let success = false
            return res.status(400).json({ error: "Incorrect credentials. please check once again" });
        }
        const comparePassword = await bcrypt.compare(paswword, user.password); //user entered password and database hashed password. note :- 1st paswword is user entered and 2nd password is which we got "user" by "User.findOne({email : email})" and it returns true and false
        if (!comparePassword) {
            let success = false;
            return res.status(400).json({ success, error: "Incorrect credentials. please check once again" });
        }

        //if it reaches to this part that means the user entered credential is true. and now we will generate token for that login
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET); //here token generated
        let success = true;
        res.json({ success, authToken, user });
        console.log("Logged in successfull...");
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Occured");
    }
}


export const getUser = async (req, res) => {
    try {
        //here 2nd argunemt is middleware and we are using middleware to get the user id and we can use that middleware at any instance of time when we need to get user data by authentication. and that middleware is in "middleware/fetchuser.js" location. and this is in harry 51th video of react js
        //"fetchuser" is imported from middleware

        const userId = req.user.id; //suppose here we fetched logged in user id from middleware 

        const user = await UserModel.findById(userId).select("-password"); //then here we will fetch "that user all data from mongo db expecpt password by the help of id"

        res.status(200).json({ user });
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Occured");
    }
}


export const getUserByMonth = async (req, res) => {
    try {

        const user = await UserModel.find().select("-password");
        let usersList = [];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const countByMonth = {};
        user.map((ele) => {
            const date = ele.createdAt;
            const month = months[date.getMonth()];
            if (countByMonth[month]) {
                countByMonth[month]++;
            }
            else {
                countByMonth[month] = 1;
            }
        })
        res.status(200).json(countByMonth);
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Occured");
    }
}