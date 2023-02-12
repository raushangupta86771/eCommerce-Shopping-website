import { React, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { uploadReview } from "../../../actions/UploadActions.js"
import SuccessReview from '../success/SuccessReview.jsx';
import "./Style.css"

const PostReview = () => {
    const dispatch = useDispatch();

    const productId = window.location.pathname; //getting url after domain name
    const str = productId.slice(6) //getting all data after 6 characher i.e actual product id

    const [showSuccess, setShowSuccess] = useState(false);
    const [RatingSelected, setRatingSelected] = useState('1');

    const handleRatingChange = event => {
        setRatingSelected(event.target.value);
    };

    // const id = useRef();
    const name = useRef();
    // const userId = useRef();
    // const rating = useRef();
    const comment = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const rating = parseInt(RatingSelected);
        const newReview = {
            id: str,
            name: name.current.value,
            rating: rating,
            comment: comment.current.value,
            userId: localStorage.getItem('userId'),
        }
        dispatch(uploadReview(newReview)); //sending review data to actions
        setShowSuccess(true)
    }

    return (
        <>
            {
                !showSuccess ? <div className="PostReview container my-3">
                    <h2 id="fh2">WE APPRECIATE YOUR REVIEW!</h2>
                    <h6 id="fh6">Your review will help us to improve our web hosting quality products, and customer services.</h6>

                    <form id="feedback" action="">
                        <div className="container make-center">
                            <div className="pinfo">Your personal info</div>

                            <div className="form-group">
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                        <input name="name" placeholder="John Doe" className="form-control" type="text" ref={name} />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="form-group">
                            <div className="col-md-4 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                                    <input name="email" type="email" className="form-control" placeholder="john.doe@yahoo.com" />
                                </div>
                            </div>
                        </div> */}

                            <div className="pinfo">Rate our overall services.</div>

                            <div className="form-group">
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-heart"></i></span>
                                        <select className="form-control" id="rate" value={RatingSelected} onChange={handleRatingChange}>
                                            <option value="1star">1</option>
                                            <option value="2stars">2</option>
                                            <option value="3stars">3</option>
                                            <option value="4stars">4</option>
                                            <option value="5stars">5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="pinfo">Write your feedback.</div>


                            <div className="form-group">
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-pencil"></i></span>
                                        <textarea className="form-control" id="review" rows="3" ref={comment}></textarea>

                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>

                        </div>

                    </form>
                </div> : <SuccessReview />
            }
        </>
    )
}

export default PostReview