import typeToReducer from 'type-to-reducer';
import { GET_CATEGORIES } from '../../constants/actionTypes';
import { IPayload, IStore } from '../../types';
import {
    PENDING,
    FULFILLED,
    REJECTED,
} from '../../constants/common';

type IState = IStore['categories'];

export const initialState: IState = {
    items: [],
    isFetching: false,
};

export default typeToReducer({
    [GET_CATEGORIES]: {
        [PENDING]: (state: IState): IState => ({
            ...state,
            isFetching: true,
        }),
        [FULFILLED]: (state: IState, { payload }: IPayload): IState => ({
            ...state,
            items: payload,
            isFetching: false,
        }),
        [REJECTED]: (state: IState): IState => ({
            ...state,
            isFetching: false,
        }),
    },
}, initialState);
