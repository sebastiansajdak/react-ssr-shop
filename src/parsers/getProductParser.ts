import productParser from './productParser';
import { IDocument, IProduct, ISnapshot } from '../types';

export default (snapshot: ISnapshot) => {
    const products: IProduct[] = [];

    snapshot.forEach((doc: IDocument) => {
        products.push(productParser(doc));
    });

    return products;
}
