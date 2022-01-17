import Layout from '@assets/components/Layout'
import SearchBar from '@assets/components/SearchBar'
import { handleAxiosError, getAPIBaseURL } from '@assets/utils/tool'
import axios from 'axios'
import type { NextPage, GetServerSidePropsResult, GetServerSidePropsContext } from 'next'
import type { ProductsResponse, ProductsQueryString } from '../pages/api/products'
import type { Book } from '@assets/seeds/books'
import Head from 'next/head'
import ProductCard from '@assets/components/ProductCard'
import useSWR from 'swr'
import { When } from 'react-if'
import Spinner from '@assets/components/Spinner'
import { useState } from 'react'
import type { MouseEventHandler } from 'react'

/** 接收的 Query String 定義 */
interface OverrideContext extends GetServerSidePropsContext {
  query: ProductsQueryString
}

/** GetServerSideProps 回傳結果定義 */
type SearchResult = {
  keyword: string
  books: Book[]
  totalPage: number
  page: number
}

const LIMIT = 10 // 設定單頁筆數

export async function getServerSideProps(context: OverrideContext): Promise<GetServerSidePropsResult<SearchResult>> {
  const searchKeyWord = context.query.q || ''

  try {
    // 模擬 API Server 分離, 打 API 的情況
    const baseURL = getAPIBaseURL()
    const data = await fetchBooks(`/api/products`, searchKeyWord, 1, baseURL)

    return {
      props: {
        books: data.results,
        totalPage: data.totalPage!,
        page: data.page!,
        keyword: searchKeyWord
      },
    }
  } catch (e) {
    handleAxiosError(e)
    return {
      props: { books: [], totalPage: 0, page: 0, keyword: searchKeyWord },
    }
  }
}

// SSR + CSR Page
// Server 端渲染第一批分頁, 後續由 CSR 獲取
const Search: NextPage<SearchResult> = function (props) {
  const { keyword, books, totalPage } = props
  const [pageIdx, setPageIdx] = useState(1)
  const isFinished = pageIdx >= totalPage

  // SSR 拿到的第一批資料
  const firstBooks = books

  // Client 端處理後續的下拉分頁
  const pagesCSR: JSX.Element[] = []
  for (let idx = 2; idx <= pageIdx; idx++) {
    pagesCSR.push(<Page pageIdx={idx} keyword={keyword} key={idx} />)
  }

  return (
    <Layout hasNav>
      <Head>
        <title>Fake-Kado | 包含「{keyword}」的搜尋結果</title>
      </Head>

      <div className="container override px-3 px-sm-5 pt-4">
        <SearchBar wrapperClass="mb-4" keyword={keyword} />

        <div className="info-bar d-flex py-3 small border-bottom">
          <div>
            {'共'}
            <span className="color-primary mx-1">{firstBooks.length}</span>
            {'部作品'}
          </div>
        </div>

        <section className="py-5">
          <div className="row row-cols-1 row-cols-md-2">
            {firstBooks?.map((book) => (
              <ProductCard
                key={book.id} //
                product={book}
                wrapperClass="col mb-4"
              />
            ))}
            {pagesCSR}
          </div>
          <When condition={!isFinished}>
            <SeeMoreBtn onClick={() => setPageIdx(pageIdx + 1)} />
          </When>
        </section>
      </div>

      <style jsx>{`
        .container.override {
          max-width: 1024px;
        }

        .info-bar {
          color: var(--theme-ui-colors-gray-8);
        }

        .color-primary {
          color: var(--theme-ui-colors-primary);
        }
      `}</style>
    </Layout>
  )
}

export default Search


// 拆分組件 and methods
// =======================

async function fetchBooks(url: string, keyword: string, pageIdx: number, baseURL?: string) {
  const params: ProductsQueryString = {
    q: keyword,
    order: 'DESC',
    limit: LIMIT.toString(),
    page: pageIdx.toString(),
  }
  const { data } = await axios.get<ProductsResponse>(url, { params, baseURL })
  if (data.status !== 'ok') throw new Error('Server Error')
  return data
}

/** 分頁單位組件 */
function Page(props: { pageIdx: number, keyword: string }) {
  const { pageIdx, keyword } = props
  const { data, error } = useSWR([`/api/products`, keyword, pageIdx], fetchBooks)
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
      <button className="more-btn primary-btn small fw-bold" onClick={onClick}>
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

        .primary-btn {
          color: white;
          background-color: var(--theme-ui-colors-primary);
          border: 1px solid white;
          padding: 0.75rem 0;
        }
      `}</style>
    </div>
  )
}