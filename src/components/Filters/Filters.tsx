import * as React from 'react';
import * as styles from './Filters.scss';
import FiltersPlaceholder from '../Placeholders/Filters';
import { apiGetFilteredProducts } from '../../actions/products';
import {
    clearFilters,
    setFilterCategory,
    setFilterName,
} from '../../actions/filters';
import { getCategories } from '../../actions/categories';
import { ICategory, IStore } from '../../types';
import { useDispatch, useSelector } from 'react-redux';

const Filters = () => {
    const {
        items,
        isFetching,
    } = useSelector((state: IStore) => state.categories);
    const filtersState = useSelector((state: IStore) => state.filters);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!items.length) {
            dispatch(getCategories());
        }

        return () => dispatch(clearFilters())
    }, []);

    const clearFiltersHandler = React.useCallback(() => {
        const action = clearFilters();

        dispatch(action);
        dispatch(apiGetFilteredProducts());
    }, []);

    const filterEventHandler = React.useCallback((name?: any, category?: string) => {
        let action = null;
        let nextName = null;
        let nextCategory = null;
        if (name !== null) {
            nextName = name.target.value;
            nextCategory = filtersState.category;
            action = setFilterName(nextName);
        } else {
            nextName = filtersState.name;
            nextCategory = category;
            action = setFilterCategory(nextCategory);
        }

        dispatch(action);
        dispatch(apiGetFilteredProducts(nextName, nextCategory));
    }, [filtersState.name, filtersState.category]);

    return (
        !isFetching ?
        <section className={styles.wrapper}>
            <div className={styles.section}>
                <h3 className={styles.subtitle}>Filter by name</h3>
                <input
                    value={filtersState.name}
                    onChange={filterEventHandler}
                    className={styles.filterInput}
                    type='text'
                    title='Type search term here'
                />
            </div>

            <div className={styles.section}>
                <h3 className={styles.subtitle}>
                    Categories:
                    <span
                        className={styles.clearBtn}
                        onClick={clearFiltersHandler}
                    >
                        Clear filters
                    </span>
                </h3>
                <ul className={styles.categories}>
                    {items.map((item: ICategory) =>
                        <li
                            key={item.id}
                            className={styles.listItem}
                        >
                            <span
                                className={styles.listItemBtn}
                                onClick={() => filterEventHandler(null, item.key)}
                            >
                                {item.name}
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </section>
        :
        <FiltersPlaceholder />
    );
}

export default React.memo(Filters);
