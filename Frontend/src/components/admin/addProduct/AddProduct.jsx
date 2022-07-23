import { React, useRef, useState } from 'react'
import { uploadImage, uploadPost } from "../../../actions/UploadActions.js"
import { useDispatch } from 'react-redux';

const AddProduct = () => {
    const dispatch = useDispatch();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const desc = useRef();
    const title = useRef();
    const price = useRef();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            desc: desc.current.value,
            title: title.current.value,
            price: price.current.value,
        }

        if (image) { //agar post me image bhi hai to usko server ke local storage me save kar rhe, FormData() ke liye google karo
            const data = new FormData();
            const fileName = Date.now() + image.name; //file name will be current date with time + image name
            data.append("name", fileName);
            data.append("file", image);
            newPost.image = fileName;

            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error);
            }
        };

        dispatch(uploadPost(newPost)); //sending post data (user_id,desc,image) to actions

    }

    return (
        <div className='AddProduct'>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Title</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={title} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">price</label>
                    <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={price} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">desc</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={desc} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">image</label>
                    <input type="file" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='myImage' ref={imageRef} onChange={onImageChange} />
                </div>
                <button onClick={handleSubmit} type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddProduct