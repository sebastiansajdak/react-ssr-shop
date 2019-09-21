import * as React from 'react';
import * as styles from './Products.scss';
import Product from '../Product';
import ProductsPlaceholder from '../Placeholders/Products';
import { apiGetAllProducts, clearProducts } from '../../actions/products';
import { IProduct, IStore } from '../../types';
import { useDispatch, useSelector } from 'react-redux';

const Products = () => {
    const {
        items,
        isFetching,
        isFetched,
    } = useSelector((state: IStore) => state.products);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!isFetched) {
            dispatch(apiGetAllProducts());
        }

        return () => dispatch(clearProducts());
    }, []);

    return (
        <>
            {!isFetching ?
                items.map((product: IProduct) =>
                    <div
                        data-id={product.id}
                        key={product.id}
                        className={styles.productWrapper}
                    >
                        <Product product={product} />
                    </div>
                )
                :
                <ProductsPlaceholder />
            }
        </>
    );
}

export default React.memo(Products);
