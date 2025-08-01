import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>DiscountHub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component key={router.route} {...pageProps} />
    </>
  );
}
