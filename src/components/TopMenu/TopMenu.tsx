import * as React from 'react';
import * as styles from './TopMenu.scss';
import cn from 'classnames';
import { LOGO_URL } from '../../constants/common';
import { Link } from 'react-router-dom';

interface IProps {
    count: number;
}

const TopMenu = ({
    count
}: IProps) => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.logo}>
                    <Link
                        to='/'
                        title='Link to the home page'
                    >
                        <img
                            className={styles.img}
                            src={LOGO_URL}
                            alt='Company logo'
                        />
                    </Link>
                </div>
                <div className={styles.menuWrapper}>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <Link
                                to='/'
                                title='Link to the home page'
                                className={styles.link}
                            >
                                Home
                            </Link>
                        </li>
                        <li className={styles.listItem}>
                            <Link
                                to='/cart'
                                className={cn(styles.link, styles.cart)}
                                title='Link to the cart page'
                            >
                                Cart
                                <span className={styles.count}>{count}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default React.memo(TopMenu);
