import * as React from 'react';
import * as styles from './Cart.scss';
import cn from 'classnames';

const Cart = () =>
    <section className={styles.wrapper}>
        {[0,1].map((item: number) =>
            <div
                key={item}
                className={styles.box}
            >
                <div className={styles.left}></div>
                <div className={styles.right}>
                    <div className={cn(styles.top, styles.line)}></div>
                    <div className={cn(styles.bottom, styles.line)}></div>
                </div>
            </div>  
        )}
    </section>;

export default React.memo(Cart);
