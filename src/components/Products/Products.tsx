import * as React from 'react';
import * as styles from './Products.scss';
import Product from '../Product';
import ProductsPlaceholder from '../Placeholders/Products';
import { IProduct } from '../../types';

interface IProps {
    products: IProduct[];
    isFetching: boolean;
}

const Products = ({
    products,
    isFetching,
}: IProps) =>
    <>
        {!isFetching ?
            products.map((product: IProduct) =>
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

export default React.memo(Products);
