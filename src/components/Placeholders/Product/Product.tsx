import * as React from 'react';
import * as styles from './Product.scss';
import cn from 'classnames';

const Product = () =>
    <section className={styles.wrapper}>
        <div className={styles.left}>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
        </div>
        <div className={styles.right}>
            <div className={cn(styles.title, styles.line)}></div>
            <div className={cn(styles.price, styles.line)}></div>
            <div className={cn(styles.description, styles.line)}></div>
        </div>
    </section>;

export default React.memo(Product);
