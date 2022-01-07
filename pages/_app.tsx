import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A Next.js learning project" />
        <meta name="og:title" content="Fake-Kado | learning project" />
        <meta name="og:description" content="A Next.js learning project" />
        <meta name="og:image" content="https://nextjs.org/static/twitter-cards/learn-twitter.png" />
        <link rel="icon" href="/favicon.ico" />
        <title>Fake-Kado</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
