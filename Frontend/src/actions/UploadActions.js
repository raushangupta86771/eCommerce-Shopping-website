import * as UploadApi from "../api/UploadRequest";

export const uploadImage = (data) => async (dispatch) => {
  try {
    // console.log("Image upload Action start ho gya hy")
    await UploadApi.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = (data) => async (dispatch) => {
  console.log("action waale file se hu")
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost =await UploadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};


export const uploadReview = (data) => async (dispatch) => {
  console.log("action waale file se hu")
  dispatch({ type: "UPLOAD_START" });
  try {
    const newReview =await UploadApi.uploadReview(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newReview.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};

