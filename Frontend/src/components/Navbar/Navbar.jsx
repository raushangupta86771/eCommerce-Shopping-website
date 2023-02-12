import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import "./Navbar.css"

const Navbar = () => {
    const cartItems = useSelector((state) => state.cartReducer.items[0]);
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(process.env.REACT_APP_ADMIN_USERID)

        // if(process.env.REACT_APP_ADMIN_USERID===localStorage.getItem('userId'))
        // {console.log(localStorage.getItem('userId'))}
    },[])

    const hadndleLogOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('userId');
        navigate('/signup')
    }

    return (
        <div className='Navbar'>
            <nav className="navbar navbar-expand-lg adNav my-2">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img className='nav-img-adjust' src='https://images.all-free-download.com/images/graphiclarge/food_logo_6841869.jpg'></img></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse adj-right float-end fa-pull-right" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto float-end" >
                            <li className="nav-item">
                                <Link className="nav-link active " to="/orders">
                                    <img className='adj-user-analytics-logo ' src='https://cdn2.iconfinder.com/data/icons/e-commerce-and-shopping-13/64/e-commerce_shopping_order_completed-512.png' />
                                </Link></li>
                            <li className="nav-item">

                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/cart"><i class="fas fa-shopping-cart cart-adjust"></i></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active " to="/user_analytics">
                                    <img className='adj-user-analytics-logo' src='https://cdn-icons-png.flaticon.com/512/235/235183.png' />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <li><Link className="nav-link active" to="/signup"><img className='adj-user-analytics-logo' src='https://w7.pngwing.com/pngs/292/680/png-transparent-add-person-add-person-icon.png' /></Link></li>
                            </li>
                            {
                                localStorage.getItem('userId') === process.env.REACT_APP_ADMIN_USERID &&
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Admin
                                    </Link>
                                    <ul className="dropdown-menu adNav-in" aria-labelledby="navbarDropdown">
                                        {/* <li><Link className="dropdown-item" to="#">Buyer</Link></li> */}


                                        {/* enabling "Add product" button only when userId of localstorage and userId of actual admin (which is stored in .env) if both matches */}
                                        {
                                            localStorage.getItem('userId') === process.env.REACT_APP_ADMIN_USERID && <li><Link className="dropdown-item" to="/addProcuct" >Add Product</Link></li>
                                        }

                                        {
                                            localStorage.getItem('userId') === process.env.REACT_APP_ADMIN_USERID && <li><Link className="dropdown-item" to="/users_Orders" >Users Order</Link></li>
                                        }
                                    </ul>
                                </li>
                            }
                            <li className="nav-item">
                                <li><Link onClick={hadndleLogOut} className="nav-link active" to=""><img className='adj-user-analytics-logo' src='https://cdn-icons-png.flaticon.com/512/1053/1053210.png' /></Link></li>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

