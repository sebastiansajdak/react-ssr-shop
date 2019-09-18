import typeToReducer from 'type-to-reducer';
import { IPayload, IStore } from '../../types';
import {
    FILTERS_SET_NAME,
    FILTERS_SET_CATEGORY,
    FILTERS_CLEAR,
} from '../../constants/actionTypes';

type IState = IStore['filters'];

export const initialState: IState = {
    category: '',
    name: '',
};

export default typeToReducer({
    [FILTERS_SET_NAME]: (state: IState, { payload }: IPayload): IState => ({
        ...state,
        name: payload.name,
    }),
    [FILTERS_SET_CATEGORY]: (state: IState, { payload }: IPayload): IState => ({
        ...state,
        category: payload.category,
    }),
    [FILTERS_CLEAR]: (state: IState): IState => ({
        ...state,
        category: '',
        name: '',
    }),
}, initialState);
