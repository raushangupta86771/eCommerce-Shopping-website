import React from 'react'
import HomeCenter from '../../components/HomeComps/Home Center/Home-Center'
import Navbar from '../../components/Navbar/Navbar'
import "./Home.css"
import { Link } from 'react-router-dom'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <div className='Home'>
      <Navbar />
      <Link className="chat-icon-stick" aria-current="page" to="/chats"><i className='fa fa-comment-alt fa-2x' ></i>
      </Link>
      {/* <Link className="chat-icon-stick" href="/chats">
        <i className='fa fa-comment-alt'></i>
      </Link> */}
      <HomeCenter />
      {/* <Footer/> */}
    </div>
  )
}

export default Home