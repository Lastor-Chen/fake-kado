import Layout from '@components/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Fake-Kado | Products</title>
      </Head>

      <h1 className='test'>Products Page</h1>
      <div>
        {Array.from(Array(5), (_, idx) => (
          <div key={idx}>
            <Link href={`/product/${idx}`}>
              <a>Product {idx}</a>
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        .test {
          color: red;
        }
      `}</style>
    </Layout>
  )
}

export default Home
