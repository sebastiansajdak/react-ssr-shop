import cartInitParser from '../../parsers/cartInitParser';
import getProductByIdParser from '../../parsers/getProductByIdParser';
import { DB_TABLES } from '../../constants/common';
import { getCollection } from '../../helpers/firebase';
import { ICookieProduct, ISnapshot } from '../../types';
import { Dispatch } from 'redux';
import {
    CART_CLEAR,
    CART_COUNT_DECREASE,
    CART_COUNT_INCREASE,
    CART_COUNT_SET,
    CART_INIT,
    CART_REMOVE,
    CART_ADD,
} from '../../constants/actionTypes';

export const apiGetCartProducts =
    (cartProducts: ICookieProduct[]) => async (dispatch: Dispatch) => {
        const collection = getCollection(DB_TABLES.PRODUCTS);
        const ids = cartProducts.map((item: ICookieProduct) => item.id);

        const request = collection.get().then((snapshot: ISnapshot) =>
            cartInitParser(snapshot, ids)
        );

        return dispatch({
            type: CART_INIT,
            payload: request,
        });
    }

export const apiAddProductToTheCart = (id: string) => async (dispatch: Dispatch) => {
    const collection = getCollection(DB_TABLES.PRODUCTS).doc(id);
    const request = collection.get().then((snapshot: ISnapshot) => {
        dispatch(increaseCartCount());

        return getProductByIdParser(snapshot);
    });

    return dispatch({
        type: CART_ADD,
        payload: request,
    });
}

export const setCartCount = (count: number) => ({
    type: CART_COUNT_SET,
    payload: {
        count,
    }
});

export const increaseCartCount = () => ({
    type: CART_COUNT_INCREASE,
});

export const decreaseCartCount = () => ({
    type: CART_COUNT_DECREASE,
});

export const clearTheStore = () => ({
    type: CART_CLEAR,
});

export const removeProductFromCart =
    (id: string) => async (dispatch: Dispatch) => {
        dispatch({
            type: CART_REMOVE,
            payload: {
                id,
            }
        });

        dispatch(decreaseCartCount());
    }
