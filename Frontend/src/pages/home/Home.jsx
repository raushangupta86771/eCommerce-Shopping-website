import React from 'react'
import HomeCenter from '../../components/HomeComps/Home Center/Home-Center'
import Navbar from '../../components/Navbar/Navbar'

const Home = () => {
  return (
    <div className='Home'>
        <Navbar/>
        <HomeCenter/>
    </div>
  )
}

export default Home