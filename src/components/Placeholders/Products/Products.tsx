import * as React from 'react';
import * as styles from './Products.scss';

const Products = () =>
    <section className={styles.wrapper}>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
    </section>;

export default React.memo(Products);
