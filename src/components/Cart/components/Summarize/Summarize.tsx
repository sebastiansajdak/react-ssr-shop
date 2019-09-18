import * as React from 'react';
import * as styles from './Summarize.scss';
import cn from 'classnames';

interface IProps {
    subtotal: number;
    total: number;
}

const Summarize = ({
    subtotal,
    total,
}: IProps) =>
    <section className={styles.wrapper}>
        <div className={styles.row}>
            <span>Bag subtotal:</span>
            <span className={styles.price}>${subtotal}</span>
        </div>
        <div className={styles.row}>
            <span>Shipping:</span>
            <span className={styles.price}>$10</span>
        </div>
        <div className={cn(styles.row, styles.total)}>
            <span>Total:</span>
            <span className={styles.price}>${total}</span>
        </div>
    </section>;

export default React.memo(Summarize);
