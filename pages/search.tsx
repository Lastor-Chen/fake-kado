import Layout from '@assets/components/Layout'
import SearchBar from '@assets/components/SearchBar'
import { handleAxiosError } from '@assets/utils/tool'
import axios from 'axios'
import type { NextPage, GetServerSidePropsResult, GetServerSidePropsContext } from 'next'
import type { ProductsResponse } from '../pages/api/products'
import type { Book } from '@assets/seeds/books'

/** 接收的 Query String 定義 */
interface OverrideContext extends GetServerSidePropsContext {
  query: { q?: string }
}

/** 回傳結果定義 */
type SearchResult = {
  q: string,
  books: Book[]
}

export async function getServerSideProps(context: OverrideContext): Promise<GetServerSidePropsResult<SearchResult>> {
  const searchKeyWord = context.query.q || ''

  // 模擬 API Server 分離, 打 API 的情況
  const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://fake-kado.vercel.app'
  try {
    const { data } = await axios.get<ProductsResponse>(`/api/products`, {
      baseURL,
      params: { q: searchKeyWord },
    })

    return {
      props: { books: data.results, q: searchKeyWord },
    }
  } catch (e) {
    handleAxiosError(e)
    return {
      props: { books: [], q: searchKeyWord },
    }
  }
}

const Search: NextPage = function (props) {
  console.log(props)

  return (
    <Layout>
      <SearchBar />
      <h1>Search</h1>
    </Layout>
  )
}

export default Search
