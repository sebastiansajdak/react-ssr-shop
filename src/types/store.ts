import ICategory from './category';
import IProduct from './product';

export default interface IStore {
    products: {
        items: IProduct[],
        item: IProduct | null,
        isFetching: boolean;
        isFetched: boolean;
    },
    categories: {
        items: ICategory[],
        isFetching: boolean;
    },
    filters: {
        category: string;
        name: string;
    },
    cart: {
        products: IProduct[],
        count: number;
        isFetching: boolean;
        isFetched: boolean;
    }
}
