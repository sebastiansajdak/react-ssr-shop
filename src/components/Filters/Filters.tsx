import * as React from 'react';
import * as styles from './Filters.scss';
import FiltersPlaceholder from '../Placeholders/Filters';
import { ICategory } from '../../types';

interface IProps {
    filterInputValue: string;
    categories: ICategory[];
    filterEvent: (name?: string, category?: string) => void;
    clearAction: () => void;
    isFetching: boolean;
}

const Filters = ({
    filterInputValue,
    categories,
    filterEvent,
    clearAction,
    isFetching
}: IProps) =>
    !isFetching ?
        <section className={styles.wrapper}>
            <div className={styles.section}>
                <h3 className={styles.subtitle}>Filter by name</h3>
                <input
                    value={filterInputValue}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        filterEvent(event.target.value)
                    }
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
                        onClick={clearAction}
                    >
                        Clear filters
                    </span>
                </h3>
                <ul className={styles.categories}>
                    {categories.map((category: ICategory) =>
                        <li
                            key={category.id}
                            className={styles.listItem}
                        >
                            <span
                                className={styles.listItemBtn}
                                onClick={() => filterEvent(null, category.key)}
                            >
                                {category.name}
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </section>
        :
        <FiltersPlaceholder />

export default React.memo(Filters);
