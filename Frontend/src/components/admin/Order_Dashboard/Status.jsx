import React, { useContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Status = ({ product, id }) => {
    const refShip = useRef(null);
    const closeRefShip = useRef(null);
    const [curr_productID, set_curr_productID] = useState(id);
    const [ModalFromBoth, setModalFromBoth] = useState(false);
    const [ModalCancel, setModalCancel] = useState(false);

    useEffect(() => {
        set_curr_productID(product._id);
    }, [])

    const refDeliver = useRef(null);
    const closeDeliver = useRef(null);

    const handleDeliver = (e) => {
        e.preventDefault();
        setModalFromBoth(true);
        // refDeliver.current.dispatchEvent(new MouseEvent('click'));
    }
    const handleShip = (e) => {
        e.preventDefault();
        setModalFromBoth(false);
        // refShip.current.dispatchEvent(new MouseEvent('click'));
    }
    const handleCancel = (e) => {
        e.preventDefault();
        setModalCancel(true);
        console.log(e);
        // refShip.current.dispatchEvent(new MouseEvent('click'));
    }
    const handleShipConfirm = (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/order/updateOrder`
        alert(product._id)
        if (ModalFromBoth == false) {
            try {
                axios({
                    method: "put",
                    url: url,
                    data: {
                        "orderId": product._id,
                        "isPlaced": true,
                        "isShipped": true,
                        "isDelivered": false
                    }
                }).then((res) => {
                    closeRefShip.current.dispatchEvent(new MouseEvent('click'));;
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
                        "orderId": id,
                        "isPlaced": true,
                        "isShipped": true,
                        "isDelivered": true
                    }
                }).then((res) => {
                    closeRefShip.current.dispatchEvent(new MouseEvent('click'));;
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
                        "orderId": id,
                        "isPlaced": false,
                        "isShipped": false,
                        "isDelivered": false
                    }
                }).then((res) => {
                    closeRefShip.current.dispatchEvent(new MouseEvent('click'));;
                })
            } catch (error) {
                // alert(error)
                console.log(error);
            }
        }
    }

    return (
        <div>
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



            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" className="m-1 btn btn-danger" onClick={handleCancel}>Cancel</button>
                <button type="button" className="m-1 btn btn-warning" onClick={handleShip}>Ship</button>
                <button type="button" className="m-1 btn btn-success" onClick={handleDeliver}>Deliver</button>
            </div>
        </div>
    )
}

export default Status