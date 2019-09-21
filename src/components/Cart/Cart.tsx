import * as React from 'react';
import * as styles from './Cart.scss';
import CartItem from './components/CartItem';
import CartPlaceholder from '../Placeholders/Cart';
import Summarize from './components/Summarize';
import { apiGetCartProducts } from '../../actions/cart';
import { IProduct, IStore } from '../../types';
import { removeProductFromCart } from '../../actions/cart';
import { round, sumBy } from 'lodash';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
    const {
        products,
        isFetching,
        isFetched,
    } = useSelector((state: IStore) => state.cart);
    const [
        cookies,
        setCookie,
    ] = useCookies(['cart']);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!isFetched) {
            dispatch(apiGetCartProducts(cookies.cart || []));
        }
    }, []);

    const removeProduct = (id: string) => {
        const newCookie = cookies
            .cart
            .filter((product: { id: string }) => product.id !== id);

        setCookie('cart', newCookie, { path: '/' });
        dispatch(removeProductFromCart(id));
    }

    const subtotal = React.useMemo(
        () =>round(sumBy(products, 'currentPrice'), 2),
        [products],
    );
    const total = React.useMemo(() => round(subtotal + 10, 2), [subtotal]);

    return (
        <section className={styles.wrapper}>
            <h1 className={styles.title}>CART</h1>
            {(!isFetching && products.length) ?
                <>
                    <div className={styles.inner}>
                        {products.map((item: IProduct) =>
                            <CartItem
                                key={item.id}
                                product={item}
                                removeProduct={removeProduct}
                            />
                        )}
                    </div>

                    <Summarize
                        subtotal={subtotal}
                        total={total}
                    />

                    <div className={styles.goToCheckout}>
                        <button className={styles.goToCheckoutBtn}>Proceed to checkout</button>
                    </div>
                </>
            :
                isFetching ?
                    <CartPlaceholder />
                :
                    <div>No items</div> 
            }
        </section>
    )
}

export default Cart;
