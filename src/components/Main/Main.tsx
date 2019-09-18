import * as React from 'react';
import * as styles from './Main.scss';
import { PROMO_BANNER_URL } from '../../constants/common';

const Main = () =>
    <section className={styles.wrapper}>
        <picture>
            <source
                srcSet={PROMO_BANNER_URL[1]}
                type='image/webp'
            />
            <source
                srcSet={PROMO_BANNER_URL[0]}
                type='image/jpeg'
            />
            <img
                className={styles.img}
                src={PROMO_BANNER_URL[0]}
                alt='up to 50% off'
            />
        </picture>
    </section>;

export default React.memo(Main);
