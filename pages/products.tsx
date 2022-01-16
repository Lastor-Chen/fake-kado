import Layout from '@components/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'
import ProductCard from '@components/ProductCard'
import type { ProductsResponse } from './api/products'
import useSWR from 'swr'
import { handleAxiosError, waitTime } from '@utils/tool'
import { When } from 'react-if'
import CategoryBar from '@components/CategoryBar'
import SearchBar from '@components/SearchBar'
import Spinner from '@assets/components/Spinner'
import { useEffect, useState } from 'react'
import type { Book } from '@assets/seeds/books'

async function fetchBooks(url: string) {
  await waitTime(1500)

  const { data } = await axios.get<ProductsResponse>(url)
  if (data.status !== 'ok') throw new Error('Server Error')
  return data
}

// SSG without data + CSR Page
const Products: NextPage = function () {
  const [pageIdx, setPageIdx] = useState(1)
  const { data, error } = useSWR('/api/products?order=DESC', fetchBooks)
  if (error) {
    handleAxiosError(error)
  }

  const limit = 10
  const offset = pageIdx * limit
  const books = data?.results.slice(0, offset)

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
          <Spinner />
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
              <div className="mt-4 text-center">
                <button className="more-btn btn-primary small fw-bold" onClick={() => setPageIdx(pageIdx + 1)}>
                  看更多
                </button>
              </div>
            </section>
          )}
        </When>
      </div>

      <style jsx>{`
        .container.override {
          max-width: 1024px;
        }

        .more-btn {
          display: inline-block;
          width: 75%;
          max-width: 256px;
          border-radius: 50rem;
          border: none;
          background-color: transparent;
        }

        .btn-primary {
          color: white;
          background-color: var(--theme-ui-colors-primary);
          border: 1px solid white;
          padding: 0.75rem 0;
        }
      `}</style>
    </Layout>
  )
}

export default Products
