import * as React from 'react';
import * as styles from './Filters.scss';
import cn from 'classnames';

const Filters = () =>
    <section className={styles.wrapper}>
        <div className={cn(styles.title, styles.line)}></div>
        <div className={cn(styles.input, styles.line)}></div>
        <div className={cn(styles.title, styles.line)}></div>
        <div className={cn(styles.option, styles.line)}></div>
        <div className={cn(styles.option, styles.line)}></div>
        <div className={cn(styles.option, styles.line)}></div>
        <div className={cn(styles.option, styles.line)}></div>
    </section>;

export default React.memo(Filters);
