export const reducer=(state,action)=>{
    if(action.type ==="REMOVE_ITEM")
    {
        return {
            ...state,
            item:state.item.filter((currEle)=>{
                return currEle._id !== action.payload;
            })
        }
    }
    return state;
}