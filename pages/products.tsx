import Layout from '@components/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'
import ProductCard from '@components/ProductCard'
import type { ProductsResponse } from './api/products'
import { handleAxiosError } from '@utils/tool'
import { When } from 'react-if'
import CategoryBar from '@components/CategoryBar'
import SearchBar from '@components/SearchBar'
import Spinner from '@assets/components/Spinner'
import useSWRInfinite from 'swr/infinite'

const LIMIT = 10 // 設定單頁筆數

// SSG without data + CSR Page
const Products: NextPage = function () {
  const { data, size, setSize, error } = useSWRInfinite(getKey, fetchBooks)
  if (error) {
    handleAxiosError(error)
  }

  // Memo:
  // useSWRInfinite 提供的 isValidating 無法當作 isLoading flag
  // 該 hook 會先更新 size -> 打 API -> 更新 data
  // 利用這個特性，可以取得 isLoading flag
  const isLoading = data?.length !== size

  // products API 會回 totalPage
  const totalPage = data?.[0].totalPage
  const isFinished = size >= totalPage!

  return (
    <Layout hasNav>
      <Head>
        <title>Fake-Kado | Books</title>
      </Head>

      <div className="container override px-3 px-sm-5 pt-4">
        <SearchBar wrapperClass="mb-4" />
        <CategoryBar />

        <section className="py-5">
          <div className="row row-cols-1 row-cols-md-2">
            {data?.map((res) => {
              return res.results.map((book) => (
                <ProductCard
                  key={book.id} //
                  product={book}
                  wrapperClass="col mb-4"
                />
              ))
            })}
            <When condition={error}>
              <div className="w-100 py-3 text-center">Failed to fetch data.</div>
            </When>
            <When condition={isLoading && !error}>
              <Spinner wrapperClass="w-100 py-3" />
            </When>
          </div>
          <When condition={!isFinished}>
            <div className="mt-4 text-center">
              <button className="more-btn primary-btn small fw-bold" onClick={() => setSize(size + 1)}>
                看更多
              </button>
            </div>
          </When>
        </section>
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

        .primary-btn {
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

// Methods
// =======================

function getKey(pageIdx: number, preResponse: ProductsResponse) {
  if (preResponse && preResponse.results.length < LIMIT) return null

  // getKey 的 pageIdx 是 0 起始
  // products API 設計是 1 起始
  const page = pageIdx + 1
  return `/api/products?order=DESC&limit=${LIMIT}&page=${page}`
}

async function fetchBooks(url: string) {
  const { data } = await axios.get<ProductsResponse>(url)
  if (data.status !== 'ok') throw new Error('Server Error')
  return data
}
