import * as CartsApi from "../api/CartRequests";

export const addToCart = (item) => async (dispatch) => {
  dispatch({ type: "ADDING_START" });
  try {
    const { data } = await CartsApi.addToCart(item);
    console.log(data);
    dispatch({ type: "ADDING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ADDING_FAIL" });
  }
};


export const updateCart = (updatedData, id) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await CartsApi.updateCart(updatedData, id);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPDATING_FAIL" });
  }
};


export const getCartItems = (id) => async (dispatch) => {
  dispatch({ type: "FETCHING_START" });
  try {
    const { data } = await CartsApi.getCarts(id);
    dispatch({ type: "FETCHING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FETCHING_FAIL" });
  }
};


export const addCartItemsInLocalhost = (id) => async (dispatch) => {
  dispatch({ type: "STORING_START" });
  try {
    const { data } = await CartsApi.getCarts(id);
    dispatch({ type: "STORING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "STORING_FAIL"});
  }
};




//  default getTimelinePosts;