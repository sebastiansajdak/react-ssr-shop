import * as React from 'react';
import * as styles from './Home.scss';
import Filters from '../Filters';
import Main from '../Main';
import Products from '../Products';
import {
    apiGetAllProducts,
    apiGetFilteredProducts,
    clearProducts,
} from '../../actions/products';
import {
    clearFilters,
    setFilterCategory,
    setFilterName,
} from '../../actions/filters';
import { getCategories } from '../../actions/categories';
import { IStore } from '../../types';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const productsState = useSelector((state: IStore) => state.products);
    const categoriesState = useSelector((state: IStore) => state.categories);
    const filterState = useSelector((state: IStore) => state.filters);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!productsState.isFetched) {
            dispatch(apiGetAllProducts());
        }

        if (!categoriesState.items.length) {
            dispatch(getCategories());
        }

        return () => {
            dispatch(clearProducts())
            dispatch(clearFilters());
        }
    }, []);

    const filterEvent = (name?: string, category?: string) => {
        let action = null;
        let nextName = null;
        let nextCategory = null;
        if (name !== null) {
            nextName = name;
            nextCategory = filterState.category;
            action = setFilterName(name);
        } else {
            nextName = filterState.name;
            nextCategory = category;
            action = setFilterCategory(category);
        }

        dispatch(action);
        dispatch(apiGetFilteredProducts(nextName, nextCategory));
    }

    const clearFiltersAction = () => {
        const action = clearFilters();

        dispatch(action);
        dispatch(apiGetFilteredProducts());
    }

    return (
        <section className={styles.wrapper}>
            <Main />

            <div className={styles.content}>
                <div className={styles.middleWrapper}>
                    <h2 className={styles.title}>All products</h2>

                    <div className={styles.inner}>
                        <div className={styles.filterWrapper}>
                            <Filters
                                filterInputValue={filterState.name}
                                categories={categoriesState.items}
                                filterEvent={filterEvent}
                                clearAction={clearFiltersAction}
                                isFetching={categoriesState.isFetching}
                            />
                        </div>
                        <div className={styles.productsWrapper}>
                            <Products
                                products={productsState.items}
                                isFetching={productsState.isFetching}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

Home.serverFetch = [apiGetAllProducts, getCategories];

export default Home;