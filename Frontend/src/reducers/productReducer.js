const productReducer = (
    state = {
        products: [],
        loading: false,
        error: false,
        uploading: false
    },
    action
) => {
    switch (action.type) {
        case "RETREIVING_START":
            return { ...state, loading: true, error: false }
        case "RETREIVING_SUCCESS":
            // localStorage.setItem("profile",JSON.stringify({...action?.data}));
            return { ...state, products: [action.data, ...state.products], loading: false, error: false }
        case "RETREIVING_FAIL":
            return { ...state, loading: false, error: true }
        default:
            return state
    }
}

export default productReducer