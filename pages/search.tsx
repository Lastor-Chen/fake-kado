import Layout from '@assets/components/Layout'
import SearchBar from '@assets/components/SearchBar'
import { handleAxiosError, getAPIBaseURL, fetchBooks } from '@assets/utils/tool'
import type { NextPage, GetServerSidePropsResult, GetServerSidePropsContext } from 'next'
import type { ProductsQueryString } from '@pages/api/products'
import type { Book } from '@assets/seeds/books'
import Head from 'next/head'
import ProductCard from '@assets/components/ProductCard'
import useSWR from 'swr'
import { When } from 'react-if'
import Spinner from '@assets/components/Spinner'
import { useEffect, useState } from 'react'
import SeeMoreBtn from '@components/SeeMoreBtn'

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
  count: number
}

const LIMIT = 10 // 設定單頁筆數

export async function getServerSideProps(context: OverrideContext): Promise<GetServerSidePropsResult<SearchResult>> {
  const searchKeyWord = context.query.q || ''

  try {
    // 模擬 API Server 分離, 打 API 的情況
    const baseURL = getAPIBaseURL()
    const page = 1
    const data = await fetchBooks(`/api/products`, LIMIT, page, searchKeyWord, baseURL)

    return {
      props: {
        books: data.results,
        count: data.count!,
        totalPage: data.totalPage!,
        page: data.page!,
        keyword: searchKeyWord,
      },
    }
  } catch (e) {
    handleAxiosError(e)
    return {
      props: { books: [], count: 0, totalPage: 0, page: 0, keyword: searchKeyWord },
    }
  }
}

// SSR + CSR Page
// Server 端渲染第一批分頁, 後續由 CSR 獲取
const Search: NextPage<SearchResult> = function (props) {
  const { keyword, books, totalPage, count } = props
  const [pageIdx, setPageIdx] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const isFinished = pageIdx >= totalPage
  const onSeeMore = () => {
    setPageIdx(pageIdx + 1)
    setIsLoading(true)
  }

  // SSR 拿到的第一批資料
  const firstBooks = books

  // Client 端處理第2頁開始的下拉分頁
  const pagesCSR: JSX.Element[] = []
  for (let idx = 2; idx <= pageIdx; idx++) {
    pagesCSR.push(
      <Page
        key={idx} //
        pageIdx={idx}
        keyword={keyword}
        setIsLoading={setIsLoading}
      />
    )
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
            <span className="color-primary mx-1">{count}</span>
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
            <SeeMoreBtn wrapperClass="mt-4" onClick={onSeeMore} disabled={isLoading} />
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

// 拆分組件
// =======================

type PageProps = {
  pageIdx: number;
  keyword: string;
  setIsLoading(isLoading: boolean): void
}

/** 分頁單位組件 */
function Page(props: PageProps) {
  const { pageIdx, keyword, setIsLoading } = props
  const { data, error } = useSWR([`/api/products`, LIMIT, pageIdx, keyword], fetchBooks)
  if (error) {
    handleAxiosError(error)
  }

  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  }, [data, setIsLoading])

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
      <When condition={cards.length}>{() => cards}</When>
    </>
  )
}
