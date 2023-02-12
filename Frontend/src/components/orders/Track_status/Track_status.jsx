import React from 'react'
import "./Track_status.css"

const Track_status = ({ productId, productData }) => {
    return (
        <div className='Track_status mx-auto adjust_main'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-10 hh-grayBox pt45 pb20">
                        <div className="row justify-content-between adjust_inside">
                            {
                                productData.isPlaced ? <div className="order-tracking completed adjust_inner">
                                    <span className="is-complete completed "></span>
                                    <p>Ordered<br /><span>Mon, June 24</span></p>
                                </div> :
                                    <div className="order-tracking adjust_inner">
                                        <span className="is-complete"></span>
                                        <p>Ordered<br /><span>Mon, June 24</span></p>
                                    </div>
                            }

                            {
                                productData.isShipped ? <div className="order-tracking completed adjust_inner">
                                    <span className="is-complete"></span>
                                    <p>Shipped<br /><span>Tue, June 25</span></p>
                                </div> :
                                    <div className="order-tracking adjust_inner">
                                        <span className="is-complete"></span>
                                        <p>Shipped<br /><span>Tue, June 25</span></p>
                                    </div>
                            }

                            {
                                productData.isDelivered ? <div className="order-tracking completed adjust_inner">
                                    <span className="is-complete "></span>
                                    <p>Delivered<br /><span>Fri, June 28</span></p>
                                </div> :
                                    <div className="order-tracking adjust_inner">
                                        <span className="is-complete"></span>
                                        <p>Delivered<br /><span>Fri, June 28</span></p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Track_status