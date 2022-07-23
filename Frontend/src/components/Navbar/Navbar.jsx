import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'

const Navbar = () => {
    const cartItems = useSelector((state) => state.cartReducer.items[0]);

    return (
        <div className='Navbar'>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">eMart</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/orders">Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/cart">Cart {cartItems ? cartItems.length : ""}</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Login as
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="#">Buyer</Link></li>
                                    <li><Link className="dropdown-item" to="#">Admin</Link></li>

                                    {/* enabling "Add product" button only when userId of localstorage and userId of actual admin (which is stored in .env) if both matches */}
                                    {
                                        localStorage.getItem('userId') === process.env.REACT_APP_ADMIN_USERID && <li><Link className="dropdown-item" to="/addProcuct" >Add Product</Link></li>
                                    }


                                    <li><Link className="dropdown-item" to="/signup">Sign up</Link></li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

