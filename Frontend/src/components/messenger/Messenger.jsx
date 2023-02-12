import axios from 'axios';
import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars'
import Navbar from '../Navbar/Navbar'
import ChatOnline from './ChatOnline/ChatOnline'
import Convo from './Convo/Convo'
import Message from './Message/Message'
import "./Messenger.css"
import { io } from "socket.io-client"

const Messenger = () => {
    const socket = useRef();
    // const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [convo, setConvo] = useState([]);
    const [currentChat, setCurrChat] = useState([]);
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    // const [socket, setSocket] = useState(null);
    const scrollRef = useRef();


    // useEffect(() => {   
    //     setSocket(io("ws://localhost:8900"));
    // }, [])



    useEffect(() => {
        socket.current = io("ws://localhost:8900");

        socket?.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])


    useEffect(() => {
        const userId = localStorage.getItem('userId')
        // console.log(socket.current)
        socket?.current.emit("addUser", userId);

        socket?.current.on("getUsers", users => {
            setOnlineUsers(users)
        })
    }, [])

    useEffect(() => {
        socket?.current.on("welcome", message => {
            console.log(message);
        })
    }, [socket])


    useEffect(() => {
        const getConvo = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/chat/${localStorage.getItem('userId')}`);
                // console.log(localStorage.getItem('userId'));
                // console.log(res.data);
                if (res.data.length === 0) {
                    const newAdminConvo = {
                        senderId: localStorage.getItem('userId'),
                        receiverId: "63bafff91420880e71fa9318"
                    }
                    const res2 = await axios.post(`http://localhost:5000/chat`, newAdminConvo);
                    const res3 = await axios.get(`http://localhost:5000/chat/${localStorage.getItem('userId')}`);
                    setConvo(res3.data);
                }
                else { setConvo(res.data); }
            } catch (error) {
                console.log(error);
            }
        }
        getConvo();

    }, [])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/message/${currentChat?._id}`);
                // console.log(localStorage.getItem('userId'))
                // console.log(currentChat?._id);
                setMessages(res.data);
                console.log(res.data)
                // console.log(`http://localhost:5000/chat/${currentChat?._id}`)
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    }, [currentChat])


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])



    const handleUpdateCurrChat = (ele) => {
        setCurrChat(ele)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: localStorage.getItem('userId'),
            text: newMessage,
            conversationId: currentChat?._id,
        }

        const receiverId = currentChat.members.find(member => member !== localStorage.getItem('userId'));

        socket?.current.emit("sendMessage", {
            senderId: localStorage.getItem('userId'),
            receiverId: receiverId,
            text: newMessage
        })

        try {
            const res = await axios.post("/message", message);
            setMessages([...messages, res.data])
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(currentChat);


    return (
        <>
            <Navbar />
            <div className='messenger my-3'>
                <div className="chatMenu ">
                    <div className="chatMenuWrapper friends-adj">
                        {/* <input type="text" placeholder='search user' className='chatMenuInput' /> */}
                        {
                            convo.map((ele) => (
                                <div onClick={() => handleUpdateCurrChat(ele)}>
                                    <Convo key={ele._id} converstation={ele} currUser={localStorage.getItem('userId')} />
                                </div>
                            )
                            )
                        }
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ? <>
                                <div className="chatBotTop">
                                    {
                                        messages.map((ele) => (
                                            <div ref={scrollRef}>
                                                <Message key={ele._id} message={ele} own={ele.sender === localStorage.getItem('userId')} />
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="chatBotBottom">
                                    <textarea name="" id="" cols="30" rows="3" placeholder='write something !!' className='chatMessageInput' onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <a onClick={handleSubmit}><img className='SEND-IMG-ADJ' src='https://icons-for-free.com/iconfiles/png/512/content+send+icon-1320087227200139227.png' /></a>
                                </div></> :
                                <span className='noConvo'>Open a conversation to start the chat...</span>
                        }
                    </div>
                </div>
                {/* <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currUser={localStorage.getItem('userId')} currentChat={currentChat}/>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default Messenger