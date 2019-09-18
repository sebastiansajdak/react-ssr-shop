import * as React from 'react';
import * as styles from './CartItem.scss';
import { IProduct } from '../../../../types';
import { Link } from 'react-router-dom';

interface IProps {
    product: IProduct;
    removeProduct: (id: string) => void;
}

const CartItem = ({
    product,
    removeProduct,
}: IProps) =>
    <section className={styles.wrapper}>
        <Link
            to={`/product/${product.id}`}
            className={styles.imgWrapper}
            title='Link to the product page'
        >
            <picture>
                <source srcSet={product.imgWEBP[0]} type='image/webp' />
                <source srcSet={product.imgJPG[0]} type='image/jpeg' />
                <img
                    className={styles.img}
                    src={product.imgJPG[0]}
                    alt='Product picture'
                />
            </picture>
        </Link>

        <div className={styles.rightSide}>
            <div className={styles.top}>
                <div className={styles.titleWrapper}>
                    <h3>{product.name}</h3>
                </div>
                <div className={styles.priceWrapper}>
                    <span>${product.currentPrice}</span>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.description}>
                    <p>{product.description}</p>
                </div>
                <div className={styles.removeWrapper}>
                    <button
                        onClick={() => removeProduct(product.id)}
                        title='Remove the item'
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </section>;

export default React.memo(CartItem);
