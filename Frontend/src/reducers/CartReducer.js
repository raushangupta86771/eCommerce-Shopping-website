const cartReducer = (
    state = {
        items: [],
        loading: false,
        error: false,
        uploading: false
    },
    action
) => {
    switch (action.type) {
        case "STORING_START":
            return { ...state, loading: true, error: false }
        case "STORING_SUCCESS":
            // localStorage.setItem("profile",JSON.stringify({...action?.data}));
            return { ...state, items: [action.data], loading: false, error: false }
        case "STORING_FAIL":
            return { ...state, loading: false, error: true }
        default:
            return state
    }
}

export default cartReducer