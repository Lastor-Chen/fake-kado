import Layout from '@components/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Fake-Kado | Home</title>
      </Head>

      <h1 className='test'>Home Page</h1>

      <style jsx>{`
        .test {
          color: red;
        }
      `}</style>
    </Layout>
  )
}

export default Home
