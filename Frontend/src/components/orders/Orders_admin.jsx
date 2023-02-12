import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import InOrder from './InOrder';
import "./Orders.css"
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import Navbar from '../Navbar/Navbar';

const Orders_admin = () => {
  const navigate = useNavigate();
  const [spinner, setSpinner] = React.useState(true);

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
        setSpinner(false);
      })
    } catch (error) {
      console.log(error);
    }

  }, [])

  return (
    <div className='Orders'>
      <Navbar />
      <div className="container-fluid">
        <h4 className='m-auto my-2 justify-content-center  d-flex'>My Orders</h4>
        <div className='row'>
          <div className='col-12 mx-auto'>
            <div className="row">

              {
                spinner ? <Spinner /> :
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

export default Orders_admin