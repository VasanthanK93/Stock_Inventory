import {ADD_ITEM,EDIT_ITEM,DELETE_ITEM,SEARCH_ITEM,FETCH_ITEM} from "../actions/types"

const productReducers = (state=[],action)=>{
        switch (action.type){
    case FETCH_ITEM:
        return action.products.filter(product=>product.deleteStatus === false)
    case SEARCH_ITEM:
        return action.products.filter(product=>product.deleteStatus === false)
    case EDIT_ITEM:
        return state.map(product =>
            (product.id === action.payload.id)
              ? {...product,
              "product_Name": action.payload.product_Name,
              "quantity": action.payload.quantity,
              "price": action.payload.price}
              : product
            
          )
    case ADD_ITEM:
        return [...state,action.payload]
        case DELETE_ITEM:
            return state.filter(product => product.id !== action.payload.id);
    default :
    return state
}    }

export default productReducers