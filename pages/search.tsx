import Layout from '@assets/components/Layout'
import SearchBar from '@assets/components/SearchBar'
import { handleAxiosError } from '@assets/utils/tool'
import axios from 'axios'
import type { NextPage, GetServerSidePropsResult, GetServerSidePropsContext } from 'next'
import type { ProductsResponse, ProductsQueryString } from '../pages/api/products'
import type { Book } from '@assets/seeds/books'
import Head from 'next/head'
import ProductCard from '@assets/components/ProductCard'

/** 接收的 Query String 定義 */
interface OverrideContext extends GetServerSidePropsContext {
  query: ProductsQueryString
}

/** GetServerSideProps 回傳結果定義 */
type SearchResult = {
  keyword: string
  books: Book[]
}

export async function getServerSideProps(context: OverrideContext): Promise<GetServerSidePropsResult<SearchResult>> {
  const searchKeyWord = context.query.q || ''

  // 模擬 API Server 分離, 打 API 的情況
  const host = context.req.headers.host
  const baseURL = process.env.NODE_ENV === 'development' ? `http://${host}` : `https://${host}`
  try {
    const params: ProductsQueryString = { q: searchKeyWord, order: 'DESC' }
    const { data } = await axios.get<ProductsResponse>(`/api/products`, { baseURL, params })

    return {
      props: { books: data.results, keyword: searchKeyWord },
    }
  } catch (e) {
    handleAxiosError(e)
    return {
      props: { books: [], keyword: searchKeyWord },
    }
  }
}

// SSR Page
const Search: NextPage<SearchResult> = function (props) {
  const books = props.books

  return (
    <Layout hasNav>
      <Head>
        <title>Fake-Kado | 包含「{props.keyword}」的搜尋結果</title>
      </Head>

      <div className="container override px-3 px-sm-5 pt-4">
        <SearchBar wrapperClass="mb-4" keyword={props.keyword} />

        <div className="info-bar d-flex py-3 small border-bottom">
          <div>
            {'共'}
            <span className="color-primary mx-1">{books.length}</span>
            {'部作品'}
          </div>
        </div>

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
