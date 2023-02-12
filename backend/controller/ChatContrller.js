import mongoose from "mongoose";
import ConversationModel from "../models/ConversationSchema.js"
import UserModel from "../models/UserModel.js"
import Messagemodel from "../models/MessageSchema.js"


// Creat new Convo
export const newCono = async (req, res) => {
    const newConvoObj = new ConversationModel(
        {
            members: [req.body.senderId, req.body.receiverId],
        }
    );
    try {
        const saveConvo = await newConvoObj.save();
        res.status(200).json(saveConvo);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};


// Creat Convo by user id (all convo of user)
export const getConvoById = async (req, res) => {
    try {
        const convos = await ConversationModel.find({
            members:{$in:[req.params.userId]},
        })
        res.status(200).json(convos);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};


//message - creating message
export const addMessage = async (req, res) => {
    const convos = new Messagemodel(req.body);
    try {
        const saveConvo = await convos.save();
        res.status(200).json(saveConvo);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};


//get message - by convo id
export const getMessages = async (req, res) => {
    try {
        const convos = await Messagemodel.find({conversationId:req.params.conversationId})
        res.status(200).json(convos);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};


export const getUserInfoForChat = async (req, res) => {
    console.log("hello")
    try {
        const userId = req.query.userIdForConvo; //suppose here we fetched logged in user id from middleware 

        const user = await UserModel.findById(userId).select("-password -email"); //then here we will fetch "that user all data from mongo db expecpt password by the help of id"

        res.status(200).json({ user });
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Occured");
    }
}