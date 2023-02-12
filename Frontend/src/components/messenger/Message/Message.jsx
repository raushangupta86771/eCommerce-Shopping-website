import React from 'react'
import "./Message.css"
import {format} from 'timeago.js'
// import TimeAgo from 'timeago-react'

const Message = ({ own, message }) => {
    return (
        <div className={own ? 'Message own' : "Message"}>
            <div className="messageTop">
                <div className="messageImage">
                    <img src="https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png" alt="" />
                </div>
                <div className="messageText">
                    <p>{message.text}</p>
                </div>
            </div>
            <div className="messageBottom">{format(message.createdAt, 'en_IN')}</div>
        </div>
    )
}

export default Message