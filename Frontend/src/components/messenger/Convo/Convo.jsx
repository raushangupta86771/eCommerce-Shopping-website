import React from 'react'
import "./Convo.css"
import axios from 'axios';
import { useEffect, useState } from 'react';


const Convo = ({ converstation, currUser }) => {
    const [User, setUser] = useState([]);
    useEffect(() => {
        const getUserFriend = async () => {
            const friendId = converstation.members.find((m) => m !== currUser);
            try {
                // console.log(friendId)
                const res = await axios.get(`http://localhost:5000/chat?userIdForConvo=` + friendId);
                setUser(res.data.user);
                // console.log(res.data.user)
            } catch (error) {
                console.log(error);
            }
        }
        getUserFriend();

    }, [converstation, currUser])

    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                alt=""
            />
            <span className="conversationName">{User?.name}</span>
        </div>
    );
}

export default Convo