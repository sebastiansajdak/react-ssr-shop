import productParser from './productParser';
import { IDocument, IProduct, ISnapshot } from '../types';

export default (snapshot: ISnapshot, cartProductsIds: string[]) => {
    const products: IProduct[] = [];

    snapshot.forEach((doc: IDocument) => {
        if (cartProductsIds.includes(doc.id)) {
            products.push(productParser(doc));
        }
    });

    return products;
}
