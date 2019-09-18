import { IDocument } from '../types';

export default (doc: IDocument) => {
    const product = doc.data();

    return {
        id: doc.id,
        name: product.name,
        category: product.category,
        currentPrice: product.current_price,
        oldPrice: product.old_price,
        description: product.description,
        imgJPG: product.img_jpg,
        imgWEBP: product.img_webp,
    }
}
