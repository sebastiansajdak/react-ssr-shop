import * as React from 'react';
import * as styles from './Home.scss';
import Filters from '../Filters';
import Main from '../Main';
import Products from '../Products';

const Home = () =>
    <section className={styles.wrapper}>
        <Main />

        <div className={styles.content}>
            <div className={styles.middleWrapper}>
                <h2 className={styles.title}>All products</h2>

                <div className={styles.inner}>
                    <div className={styles.filterWrapper}>
                        <Filters />
                    </div>
                    <div className={styles.productsWrapper}>
                        <Products />
                    </div>
                </div>
            </div>
        </div>
    </section>

export default React.memo(Home);
