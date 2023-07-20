import '../styles/globals.css';

import Head from 'next/head';
import Footer from '@/components/footer';

import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({ subsets: ['latin'] })

export default function App ( {Component, pageProps} ) {
    return (
        <main className={exo2.className}>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <title>Infinity Monkey</title>
            </Head>
            <Component {...pageProps} />
            <Footer />
        </main>
    );
};