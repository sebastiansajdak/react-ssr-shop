import getCategoryParser from '../../parsers/getCategoryParser';
import { DB_TABLES } from '../../constants/common';
import { GET_CATEGORIES } from '../../constants/actionTypes';
import { getCollection } from '../../helpers/firebase';
import { Dispatch } from 'redux';

export const getCategories = () => async (dispatch: Dispatch) => {
    const collection = getCollection(DB_TABLES.CATEGORIES);
    const request = collection.get().then(getCategoryParser);

    return dispatch({
        type: GET_CATEGORIES,
        payload: request,
    });
}
