import { IDocument } from '../types';

export default (doc: IDocument) => {
    const category = doc.data();

    return {
        id: doc.id,
        name: category.name,
        key: category.key,
    }
}
