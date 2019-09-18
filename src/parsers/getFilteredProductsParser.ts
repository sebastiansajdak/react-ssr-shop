import productParser from './productParser';
import { IDocument, IProduct, ISnapshot } from '../types';

export default (snapshot: ISnapshot, name: string, category: string) => {
    const products: IProduct[] = [];

    snapshot.forEach((doc: IDocument) => {
        const data = doc.data();
        const isName = data
            .name
            .toLowerCase()
            .includes((name)
            .toLowerCase());
        const isCategory = data.category.includes(category);

        if (isName && isCategory) {
            products.push(productParser(doc));
        }
    });

    return products;
}