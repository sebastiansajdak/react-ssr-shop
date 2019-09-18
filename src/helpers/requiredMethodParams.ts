import { apiGetAllProducts, apiGetProductById } from '../actions/products';
import { apiGetCartProducts } from '../actions/cart';
import { getCategories } from '../actions/categories';

export default (serverReq: any) => {
    let productId: string = null;

    if (serverReq.url.includes('/product/')) {
        productId = serverReq.url.split('/product/')[1];
    }

    return {
        [apiGetProductById.name]: productId,
        [apiGetAllProducts.name]: null as null,
        [getCategories.name]: null as null,
        [apiGetCartProducts.name]:
            serverReq.universalCookies.cookies.cart ?
                JSON.parse(serverReq.universalCookies.cookies.cart) : [],
    };
};
