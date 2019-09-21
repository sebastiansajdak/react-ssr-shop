import * as React from 'react';
import * as styles from './ProductPage.scss';
import ProductPlaceholder from '../Placeholders/Product';
import { apiAddProductToTheCart } from '../../actions/cart';
import { apiGetProductById, clearProducts } from '../../actions/products';
import { IStore } from '../../types';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
    match: {
        params: {
            id: string;
        }
    }
}

const ProductPage = ({
    match,
}: IProps) => {
    const {
        item: product,
        isFetching,
    } = useSelector((state: IStore) => state.products);
    const cartState = useSelector((state: IStore) => state.cart);
    const [cookies, setCookie] = useCookies(['cart']);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!product) {
            getProduct();
        }

        return () => dispatch(clearProducts());
    }, []);

    const getProduct = () => {
        const productId = match.params.id;

        const productsType = apiGetProductById(productId);
        dispatch(productsType);
    }

    const addToCart = () => {
        const existCookie = cookies.cart || [];
        setCookie('cart', [...existCookie, { id: product.id }], { path: '/' });

        dispatch(apiAddProductToTheCart(product.id));
    }

    const isAddToCartBtnDisabled = () => {
        return !!(cartState.products.find((item) => item.id === product.id))
    }

    return (
        <section className={styles.wrapper}>
            {!isFetching && product &&
                <div className={styles.inner}>
                    <div className={styles.imgSection}>
                        {product.imgJPG.map((item: string, index: number) =>
                            <div
                                key={index}
                                className={styles.imgWrapper}
                            >
                                <picture>
                                    <source
                                        srcSet={product.imgWEBP[index]}
                                        type='image/webp'
                                    />
                                    <source
                                        srcSet={item}
                                        type='image/jpeg'
                                    />
                                    <img
                                        className={styles.img}
                                        src={item}
                                        alt='Product picture'
                                    />
                                </picture>
                            </div>
                        )}
                    </div>
                    <div className={styles.descSection}>
                        <h1 className={styles.title}>{product.name}</h1>

                        <div className={styles.price}>
                            <span className={styles.current}>
                                ${product.currentPrice}
                            </span>
                            <span className={styles.old}>
                                {product.oldPrice && `, old price: $${product.oldPrice}`}
                            </span>
                        </div>
                        <div className={styles.desc}>{product.description}</div>
                        <button
                            className={styles.addToCart}
                            onClick={addToCart}
                            disabled={isAddToCartBtnDisabled()}
                        >
                            Add to cart
                        </button>

                        {isAddToCartBtnDisabled() &&
                            <div className={styles.addedToCartInfo}>
                                Product has been added to the cart
                            </div>
                        }
                    </div>
                </div>
            }
            {isFetching && <ProductPlaceholder />}
        </section>
    )
}

export default ProductPage;
