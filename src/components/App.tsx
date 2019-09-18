import * as React from 'react';
import Cart from './Cart';
import Footer from './Footer';
import Home from './Home';
import ProductPage from './ProductPage';
import ScrollToTop from '../helpers/ScrollToTop';
import TopMenu from './TopMenu';
import { apiGetCartProducts, setCartCount } from '../actions/cart';
import { IRoute, IStore } from '../types';
import { Route, Switch } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';

export const Routes: IRoute[] = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/product/:id',
        component: ProductPage,
        exact: true,
    },
    {
        path: '/cart',
        component: Cart,
        exact: true,
    }
];

const App = () => {
    const dispatch = useDispatch();
    const [ cookies ] = useCookies(['cart']);
    const cartState = useSelector((state: IStore) => state.cart);

    React.useEffect(() => {
        const cookiesTab = cookies.cart || [];
        dispatch(setCartCount(cookiesTab.length));
        
        if (!cartState.isFetched) {
            dispatch(apiGetCartProducts(cookiesTab));
        }
    }, []);

    return (
        <div>
            <ScrollToTop />
            <TopMenu count={cartState.count} />

            <Switch>
                {Routes.map((route: IRoute) =>
                    <Route key={route.path} {...route} />    
                )}
            </Switch>

            <Footer />
        </div>
    );
};

export default App;
