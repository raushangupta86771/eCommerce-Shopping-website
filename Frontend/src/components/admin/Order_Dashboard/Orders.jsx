import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';
import InAdminOrder from './InAdminOrder';
import Navbar from '../../Navbar/Navbar';
import Spinner from '../../Spinner/Spinner';


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [spinner, setSpinner] = React.useState(true);

    useEffect(() => {
        const url = `http://localhost:5000/order/getAllOrders`
        try {
            axios({
                method: "get",
                url: url,
            }).then((res) => {
                setOrders(res.data);
                setSpinner(false);
            })
        } catch (error) {
            console.log(error);
        }

    }, [])

    return (
        <div className='Orders-admin'>
            <Navbar />
            {
                spinner ? <Spinner /> :
                    <div className="container-fluid">
                        <h2 className='m-auto d-flex justify-content-center my-2'>User Orders</h2>
                        <div className='row'>
                            <div className='col-12 mx-auto '>
                                <div className="row ">
                                    {
                                        orders.map((pro) => {
                                            return <InAdminOrder product={pro} id={pro._id} key={pro._id} />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Orders