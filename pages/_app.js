import '../styles/globals.css';

import Head from 'next/head';

export default function App ( {Component, pageProps} ) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <title>Infinity Monkey</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
};