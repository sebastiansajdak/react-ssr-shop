import categoryParser from './categoryParser';
import { ICategory, IDocument, ISnapshot } from '../types';

export default (snapshot: ISnapshot) => {
    const categories: ICategory[] = [];
    
    snapshot.forEach((doc: IDocument) => {
        categories.push(categoryParser(doc));
    })

    return categories;
}
