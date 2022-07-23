import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import InOrder from './InOrder';
import "./Orders.css"
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/signup")
    }
  }, [])

  useEffect(() => {
    const url = `http://localhost:5000/order/getById/${localStorage.getItem('userId')}`
    try {
      axios({
        method: "get",
        url: url,
      }).then((res) => {
        setProducts(res.data);
      })
    } catch (error) {
      console.log(error);
    }

  }, [])

  return (
    <div className='Orders'>
      <div className="container-fluid">
        <h2>My Orders</h2>
        <div className='row'>
          <div className='col-12 mx-auto'>
            <div className="row">

              {
                products.map((pro) => {
                  return <InOrder product={pro} id={pro._id} />
                })
              }


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders