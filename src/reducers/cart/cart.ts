import typeToReducer from 'type-to-reducer';
import { IPayload, IProduct, IStore } from '../../types';
import {
    FULFILLED,
    PENDING,
    REJECTED,
} from '../../constants/common';
import {
    CART_INIT,
    CART_REMOVE,
    CART_COUNT_SET,
    CART_COUNT_INCREASE,
    CART_COUNT_DECREASE,
    CART_CLEAR,
    CART_ADD,
} from '../../constants/actionTypes';

type IState = IStore['cart'];

export const initialState: IState = {
    products: [],
    count: 0,
    isFetching: false,
    isFetched: false,
};

export default typeToReducer({
    [CART_INIT]: {
        [PENDING]: (state: IState): IState => ({
            ...state,
            isFetching: true,
        }),
        [FULFILLED]: (state: IState, action: IPayload): IState => ({
            ...state,
            products: action.payload,
            isFetching: false,
            isFetched: true,
        }),
        [REJECTED]: (state: IState): IState => ({
            ...state,
            isFetching: false,
            isFetched: false,
        }),
    },
    [CART_ADD]: {
        [PENDING]: (state: IState): IState => ({
            ...state,
            isFetching: true,
        }),
        [FULFILLED]: (state: IState, action: IPayload): IState => ({
            ...state,
            products: [
                ...state.products,
                action.payload
            ],
            isFetching: false,
            isFetched: true,
        }),
        [REJECTED]: (state: IState): IState => ({
            ...state,
            isFetching: false,
            isFetched: false,
        }),
    },
    [CART_REMOVE]: (state: IState, { payload }: IPayload): IState => ({
        ...state,
        products: state.products.filter(
            (product: IProduct) => product.id !== payload.id
        ),
    }),
    [CART_COUNT_SET]: (state: IState, { payload }: IPayload): IState => ({
        ...state,
        count: payload.count,
    }),
    [CART_COUNT_INCREASE]: (state: IState): IState => ({
        ...state,
        count: state.count + 1,
    }),
    [CART_COUNT_DECREASE]: (state: IState): IState => ({
        ...state,
        count: state.count - 1,
    }),
    [CART_CLEAR]: (state: IState): IState => ({
        ...state,
        products: [],
        isFetching: false,
        isFetched: false,
    }),
}, initialState);
