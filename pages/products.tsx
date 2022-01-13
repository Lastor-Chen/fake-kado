import Layout from '@components/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'
import ProductCard from '@components/ProductCard'
import type { Response } from './api/products'
import useSWR from 'swr'
import { waitTime, handleAxiosError } from '@utils/tool'
import { When } from 'react-if'

async function fetchBooks(url: string) {
  // 模擬 loading 延遲
  if (process.env.NODE_ENV === 'development') {
    await waitTime(1500)
  }

  const { data } = await axios.get<Response>(url)
  if (data.status !== 'ok') throw new Error('Server Error')
  return data
}

const Products: NextPage = function () {
  const { data, error } = useSWR('/api/products', fetchBooks)
  if (error) { handleAxiosError(error) }

  const books = data?.results

  return (
    <Layout hasNav>
      <Head>
        <title>Fake-Kado | Books</title>
      </Head>

      <When condition={error}>
        <div className="py-5 text-center">Failed to fetch data.</div>
      </When>

      <When condition={!books && !error}>
        <div className="py-5 text-center">Loading...</div>
      </When>

      <When condition={books?.length}>
        {() => (
          <section className="py-5">
            <div className="row row-cols-1 row-cols-sm-2">
              {books?.map((book) => (
                <ProductCard
                  key={book.id}
                  product={book}
                  wrapperClass="col mb-4"
                />
              ))}
            </div>
          </section>
        )}
      </When>
    </Layout>
  )
}

export default Products
