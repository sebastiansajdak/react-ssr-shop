import typeToReducer from 'type-to-reducer';
import { CLEAR_PRODUCTS, GET_PRODUCT, GET_PRODUCTS } from '../../constants/actionTypes';
import { FULFILLED, PENDING, REJECTED } from '../../constants/common';
import { IPayload, IStore } from '../../types';

type IState = IStore['products'];

export const initialState: IState = {
    items: [],
    item: null,
    isFetching: false,
    isFetched: false,
};

export default typeToReducer({
    [GET_PRODUCTS]: {
        [PENDING]: (state: IState): IState => ({
            ...state,
            isFetching: true,
        }),
        [FULFILLED]: (state: IState, { payload }: IPayload): IState => ({
            ...state,
            items: payload,
            isFetching: false,
            isFetched: true,
        }),
        [REJECTED]: (state: IState): IState => ({
            ...state,
            isFetching: false,
            isFetched: false,
        }),
    },
    [CLEAR_PRODUCTS]: (state: IState): IState => ({
        ...state,
        items: [],
        item: null,
        isFetching: false,
        isFetched: false,
    }),
    [GET_PRODUCT]: {
        [PENDING]: (state: IState): IState => ({
            ...state,
            isFetching: true,
        }),
        [FULFILLED]: (state: IState, { payload }: IPayload): IState => ({
            ...state,
            item: payload,
            isFetching: false,
        }),
        [REJECTED]: (state: IState): IState => ({
            ...state,
            isFetching: false,
        }),
    },
}, initialState);
