// pages/_app.js
import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../global.css'; // если у вас есть стили, подключите их

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // можно вставить логику инициализации (например, аналитика)
  }, [router.pathname]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>DiscountHub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
