import * as React from 'react';

interface IProps {
    children: any;
    initialState: any;
    scripts: string[];
    styles: string[];
}

const Html = ({
    children,
    initialState,
    scripts,
    styles,
}: IProps) =>
    <>
        <html lang='en-US'>
            <head>
                <meta charSet='UTF-8' />
                <title>Online store - server side rendering demo</title>
                <base href='/' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta name='description' content='Server side rendering demo' />
                <meta name='keywords' content='shop, ssr, redux, react, server side rendering' />
                <meta name='author' content='Sebastian Sajdak' />
                {
                    styles.map((item: string, index: number) =>
                        <link rel='stylesheet' key={index} href={item} />
                    )
                }
            </head>
            <body>
                <div
                    id='app'
                    dangerouslySetInnerHTML={{ __html: children } as any}
                />
                {initialState &&
                    <script
                        dangerouslySetInnerHTML={
                            {
                                __html: `window.APP_STATE=${JSON.stringify(initialState)}`
                            }
                        }
                    />
                }
                {
                    scripts.map((item: string, index: number) =>
                        <script key={index} src={item}></script>
                    )
                }
            </body>
        </html>
    </>

export default Html;
