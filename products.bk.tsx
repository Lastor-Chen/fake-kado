import Layout from '@components/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'
import ProductCard from '@components/ProductCard'
import type { ProductsResponse } from './api/products'
import useSWR from 'swr'
import { handleAxiosError } from '@utils/tool'
import { When } from 'react-if'
import CategoryBar from '@components/CategoryBar'
import SearchBar from '@components/SearchBar'
import Spinner from '@assets/components/Spinner'
import { useState } from 'react'
import type { MouseEventHandler } from 'react'

const LIMIT = 10 // 設定單頁筆數

// SSG without data + CSR Page
const Products: NextPage = function () {
  const [pageIdx, setPageIdx] = useState(1)

  // 下拉分頁
  const pages: JSX.Element[] = []
  for (let idx = 1; idx <= pageIdx; idx++) {
    pages.push(<Page pageIdx={idx} key={idx} />)
  }

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
            {pages}
          </div>
          <SeeMoreBtn onClick={() => setPageIdx(pageIdx + 1)} />
        </section>
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

// 拆分組件 and methods
// =======================

async function fetchBooks(url: string) {
  const { data } = await axios.get<ProductsResponse>(url)
  if (data.status !== 'ok') throw new Error('Server Error')
  return data
}

/** 分頁單位組件 */
function Page(props: { pageIdx: number }) {
  const { data, error } = useSWR(`/api/products?order=DESC&limit=${LIMIT}&page=${props.pageIdx}`, fetchBooks)
  if (error) {
    handleAxiosError(error)
  }

  const books = data?.results || []
  const cards = books.map((book) => (
    <ProductCard
      key={book.id} //
      product={book}
      wrapperClass="col mb-4"
    />
  ))

  return (
    <>
      <When condition={error}>
        <div className="w-100 py-3 text-center">Failed to fetch data.</div>
      </When>
      <When condition={!cards.length && !error}>
        <Spinner wrapperClass="w-100 py-3" />
      </When>
      <When condition={cards.length}>
        {() => cards}
      </When>
    </>
  )
}

function SeeMoreBtn({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <div className="mt-4 text-center">
      <button className="more-btn btn-primary small fw-bold" onClick={onClick}>
        看更多
      </button>

      <style jsx>{`
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
    </div>
  )
}