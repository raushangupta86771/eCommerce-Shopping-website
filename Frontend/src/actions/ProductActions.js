import * as ProductsApi from "../api/ProductRequest";

export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await ProductsApi.getAllProducts();
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

//  default getTimelinePosts;