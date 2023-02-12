import React, { useContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';

const InAdminOrder = ({ product, id }) => {
    const refShip = useRef(null);
    const closeRefShip = useRef(null);
    const [curr_productID, set_curr_productID] = useState("");
    const [ModalFromBoth, setModalFromBoth] = useState(false);
    const [ModalCancel, setModalCancel] = useState(false);
    

    const refDeliver = useRef(null);
    const closeDeliver = useRef(null);

    const handleDeliver = (e) => {
        localStorage.removeItem('orderIdUpdate')
        localStorage.setItem('orderIdUpdate',e);
        // alert(e);
        setModalFromBoth(true);
        refDeliver.current.click();
    }
    const handleShip = (e) => {
        localStorage.removeItem('orderIdUpdate')
        // e.preventDefault();
        localStorage.setItem('orderIdUpdate',e);
        setModalFromBoth(false);
        refShip.current.click();
    }
    const handleCancel = (e) => {
        localStorage.removeItem('orderIdUpdate')
        localStorage.setItem('orderIdUpdate',e);
        setModalCancel(true);
        refShip.current.click();
    }
    const handleShipConfirm = (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/order/updateOrder`
        if (ModalFromBoth == false) {
            try {
                axios({
                    method: "put",
                    url: url,
                    data: {
                        "orderId": localStorage.getItem('orderIdUpdate'),
                        "isPlaced": true,
                        "isShipped": true,
                        "isDelivered": false
                    }
                }).then((res) => {
                    closeRefShip.current.click();
                })
            } catch (error) {
                // alert(error)
                console.log(error);
            }
        }
        else {
            try {
                axios({
                    method: "put",
                    url: url,
                    data: {
                        "orderId": localStorage.getItem('orderIdUpdate'),
                        "isPlaced": true,
                        "isShipped": true,
                        "isDelivered": true
                    }
                }).then((res) => {
                    closeRefShip.current.click();
                })
            } catch (error) {
                // alert(error)
                console.log(error);
            }
        }
        if (ModalCancel) {
            try {
                axios({
                    method: "put",
                    url: url,
                    data: {
                        "orderId": localStorage.getItem('orderIdUpdate'),
                        "isPlaced": false,
                        "isShipped": false,
                        "isDelivered": false
                    }
                }).then((res) => {
                    closeRefShip.current.click();
                })
            } catch (error) {
                // alert(error)
                console.log(error);
            }
        }
        localStorage.removeItem('orderIdUpdate')
    }

    return (
        <>
            <div className="col-md-6">

                {/* Modal for shippment */}
                <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={refShip} >
                </button>

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Confirm Item has been shipped
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRefShip}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleShipConfirm}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for delivery */}
                <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={refDeliver} >
                </button>

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Confirm Item has been Delivered
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeDeliver}>Cancel</button>
                                <button type="button" className="btn btn-primary">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>



                {/* General code */}
                <div className="card my-3 adj-crd">
                    <div className="card-body justify-content-center flex-column m-auto align-items-center">
                        <img style={{ height: "15rem", width: "15rem" }} src={product.image ? process.env.REACT_APP_PUBLIC_FOLDER + product.image : ""} className="card-img-top" alt="..." />
                        <h5 className="card-title">{product.title}</h5>
                        <p>{product.price} INR</p>
                        <p className="card-text">Quantity {product.quantity}</p>
                        <p className="card-text">Order Id <span className='productId'>{product._id}</span></p>
                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" className="m-1 btn btn-danger" onClick={() => handleCancel(id)}>Cancel</button>
                            <button type="button" className="m-1 btn btn-warning" onClick={() => handleShip(id)}>Ship</button>
                            <button type="button" className="m-1 btn btn-success" onClick={() => handleDeliver(id)} >Deliver</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InAdminOrder