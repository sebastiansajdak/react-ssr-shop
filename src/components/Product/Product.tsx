import * as React from 'react';
import * as styles from './Product.scss';
import { IProduct } from '../../types';
import { Link } from 'react-router-dom';

interface IProps {
    product: IProduct;
}

const Product = ({
    product
}: IProps) =>
    <section className={styles.wrapper}>
        <Link to={`product/${product.id}`}>
            <picture>
                <source
                    srcSet={product.imgWEBP[0]}
                    type='image/webp'
                />
                <source
                    srcSet={product.imgJPG[0]}
                    type='image/jpeg'
                />
                <img
                    className={styles.img}
                    src={product.imgJPG[0]}
                    alt={product.name}
                />
            </picture>
        </Link>
        <div className={styles.titleWrapper}>
            <h3 className={styles.title}>{product.name}</h3>
        </div>
        <div className={styles.price}>
            <span>{product.oldPrice && `old price: $${product.oldPrice}`}</span>
            <span className={styles.current}>${product.currentPrice}</span>
        </div>
    </section>;

export default React.memo(Product);
