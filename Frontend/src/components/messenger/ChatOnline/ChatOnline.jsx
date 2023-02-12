import React from 'react'
import "./ChatOnline.css"

const ChatOnline = () => {
    return (
        <div className='ChatOnline'>
            <div className="ChatOnlineFriend">
                <div className="ChatOnlineImgFriend">
                    <img src="https://w7.pngwing.com/pngs/178/419/png-transparent-man-illustration-computer-icons-avatar-login-user-avatar-child-web-design-face-thumbnail.png" alt="" className='imgOnline'/>
                </div>
                <div className="chatOnlineBadge">
                </div>

                <span className="chatOnlineName">Satyam Kumar</span>
            </div>
        </div>
    )
}

export default ChatOnline