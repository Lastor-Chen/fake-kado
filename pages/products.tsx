import Layout from '@components/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import ProductCard from '@components/ProductCard'
import type { ProductsResponse } from '@pages/api/products'
import { handleAxiosError, fetchBooks, fetchBooks2 } from '@utils/tool'
import { Unless, When } from 'react-if'
import CategoryBar from '@components/CategoryBar'
import SearchBar from '@components/SearchBar'
import Spinner from '@assets/components/Spinner'
import useSWRInfinite from 'swr/infinite'
import { useInfiniteQuery } from '@tanstack/react-query'
import SeeMoreBtn from '@assets/components/SeeMoreBtn'

const LIMIT = 10 // 設定單頁筆數

// SSG without data + CSR Page
const Products: NextPage = function () {
  const { data: data2 } = useInfiniteQuery({
    queryKey: ['fetchBooks'],
    queryFn: fetchBooks2,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.page ? lastPage.page + 1 : lastPage.page
    },
  })

  const { data, size, setSize, error } = useSWRInfinite(getKey, fetchBooks)
  if (error) {
    handleAxiosError(error)
  }

  const getNextPage = () => {
    setSize(size + 1)
  }

  // Memo:
  // useSWRInfinite 提供的 isValidating 無法當作 isLoading flag
  // 該 hook 會先更新 size -> 打 API -> 更新 data
  // 利用這個特性，可以取得 isLoading flag
  const isLoading = data?.length !== size
  const isFirstLoading = !data?.length

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
          </div>
          <When condition={error}>
            <div className="w-100 py-4 text-center">Failed to fetch data.</div>
          </When>
          <When condition={isLoading && !error}>
            <Spinner wrapperClass="w-100 py-4" />
          </When>
          <Unless condition={isFinished || isFirstLoading}>
            <SeeMoreBtn wrapperClass="mt-4" onClick={() => getNextPage()} disabled={isLoading} />
          </Unless>
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

// Methods
// =======================

function getKey(pageIdx: number, preResponse: ProductsResponse) {
  if (preResponse && preResponse.results.length < LIMIT) return null

  // getKey 的 pageIdx 是 0 起始
  // products API 設計是 1 起始
  const page = pageIdx + 1
  return ['/api/products', LIMIT, page]
}
