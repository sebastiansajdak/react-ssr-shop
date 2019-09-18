import * as React from 'react';
import * as styles from './Footer.scss';

const FOOTER_DATA = [
    {
        title: 'Title',
        links: [
            {
                link: '#',
                title: 'Footer link 1',
            },
            {
                link: '#',
                title: 'Footer link 2',
            },
            {
                link: '#',
                title: 'Footer link 3',
            },
            {
                link: '#',
                title: 'Footer link 4',
            },
            {
                link: '#',
                title: 'Footer link 5',
            }
        ],
    },
    {
        title: 'Title',
        links: [
            {
                link: '#',
                title: 'Footer link 1',
            },
            {
                link: '#',
                title: 'Footer link 2',
            },
            {
                link: '#',
                title: 'Footer link 3',
            },
            {
                link: '#',
                title: 'Footer link 4',
            },
            {
                link: '#',
                title: 'Footer link 5',
            }
        ],
    },
    {
        title: 'Title',
        links: [
            {
                link: '#',
                title: 'Footer link 1',
            },
            {
                link: '#',
                title: 'Footer link 2',
            },
            {
                link: '#',
                title: 'Footer link 3',
            },
            {
                link: '#',
                title: 'Footer link 4',
            },
            {
                link: '#',
                title: 'Footer link 5',
            }
        ],
    },
    {
        title: 'Title',
        links: [
            {
                link: '#',
                title: 'Footer link 1',
            },
            {
                link: '#',
                title: 'Footer link 2',
            },
            {
                link: '#',
                title: 'Footer link 3',
            },
            {
                link: '#',
                title: 'Footer link 4',
            },
            {
                link: '#',
                title: 'Footer link 5',
            }
        ],
    },
    {
        title: 'Title',
        links: [
            {
                link: '#',
                title: 'Footer link 1',
            },
            {
                link: '#',
                title: 'Footer link 2',
            },
            {
                link: '#',
                title: 'Footer link 3',
            },
            {
                link: '#',
                title: 'Footer link 4',
            },
            {
                link: '#',
                title: 'Footer link 5',
            }
        ],
    }
];

const Footer = () =>
    <section className={styles.wrapper}>
        <div className={styles.inner}>
            {FOOTER_DATA.map((section: any, index: number) =>
                <div
                    key={index}
                    className={styles.section}
                >
                    <h4 className={styles.subtitle}>{section.title}</h4>
                    <ul className={styles.list}>
                        {section.links.map((link: any, index: number) =>
                            <li
                                key={index}
                                className={styles.listItem}
                            >
                                <a
                                    href={link.link}
                                    className={styles.link}
                                >
                                    {link.title}
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
        <div className={styles.copyright}>
            ©2019 Company
        </div>
    </section>;

export default React.memo(Footer);
