import productReducer from './products';
import categoryReducer from './categories';
import filterReducer from './filters';
import cartReducer from './cart';
import {
    combineReducers,
    Reducer,
} from 'redux';

const reducers: Reducer<object> = combineReducers({
    products: productReducer,
    categories: categoryReducer,
    filters: filterReducer,
    cart: cartReducer,
});

export default reducers;
