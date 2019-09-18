import getFilteredProductsParser from '../../parsers/getFilteredProductsParser';
import getProductByIdParser from '../../parsers/getProductByIdParser';
import getProductsParser from '../../parsers/getProductParser';
import { CLEAR_PRODUCTS, GET_PRODUCT, GET_PRODUCTS } from '../../constants/actionTypes';
import { DB_TABLES } from '../../constants/common';
import { getCollection } from '../../helpers/firebase';
import { ISnapshot } from '../../types';
import { Dispatch } from 'redux';

export const apiGetAllProducts = () => async (dispatch: Dispatch) => {
    const collection = getCollection(DB_TABLES.PRODUCTS);
    const request = collection.get().then(getProductsParser);

    return dispatch({
        type: GET_PRODUCTS,
        payload: request,
    });
}

export const apiGetFilteredProducts =
    (name = '', category = '') => async (dispatch: Dispatch) => {
        const collection = getCollection(DB_TABLES.PRODUCTS);
        const request = collection.get().then((snapshot: ISnapshot) =>
            getFilteredProductsParser(snapshot, name, category)
        );

        dispatch({
            type: GET_PRODUCTS,
            payload: request,
        });
    }

export const apiGetProductById = (id: string) => async (dispatch: Dispatch) => {
    const collection = getCollection(DB_TABLES.PRODUCTS).doc(id);
    const request = collection.get().then(getProductByIdParser);

    return dispatch({
        type: GET_PRODUCT,
        payload: request,
    });
}

export const clearProducts = () => ({
    type: CLEAR_PRODUCTS,
})
