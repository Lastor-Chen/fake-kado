import Layout from '@components/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'
import ProductCard from '@components/ProductCard'
import type { ProductsResponse } from './api/products'
import useSWR from 'swr'
import { waitTime, handleAxiosError } from '@utils/tool'
import { When } from 'react-if'
import CategoryBar from '@components/CategoryBar'
import SearchBar from '@components/SearchBar'

async function fetchBooks(url: string) {
  // 模擬 loading 延遲
  if (process.env.NODE_ENV === 'development') {
    await waitTime(1500)
  }

  const { data } = await axios.get<ProductsResponse>(url)
  if (data.status !== 'ok') throw new Error('Server Error')
  return data
}

// SSG without data + CSR Page
const Products: NextPage = function () {
  const { data, error } = useSWR('/api/products?order=DESC', fetchBooks)
  if (error) {
    handleAxiosError(error)
  }

  const books = data?.results

  return (
    <Layout hasNav>
      <Head>
        <title>Fake-Kado | Books</title>
      </Head>

      <div className="container override px-3 px-sm-5 pt-4">
        <SearchBar wrapperClass="mb-4" />
        <CategoryBar />

        <When condition={error}>
          <div className="py-5 text-center">Failed to fetch data.</div>
        </When>

        <When condition={!books && !error}>
          <div className="py-5 text-center">Loading...</div>
        </When>

        <When condition={books?.length}>
          {() => (
            <section className="py-5">
              <div className="row row-cols-1 row-cols-md-2">
                {books?.map((book) => (
                  <ProductCard
                    key={book.id} //
                    product={book}
                    wrapperClass="col mb-4"
                  />
                ))}
              </div>
            </section>
          )}
        </When>
      </div>

      <style jsx>{`
        .container.override {
          max-width: 1024px;
        }
      `}</style>
    </Layout>
  )
}

export default Products
