import Layout from '@components/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import ProductCard from '@components/ProductCard'
import type { Book } from '@seeds/books'
import useSWR from 'swr'
import { waitTime, handleAxiosError } from '@utils/tool'
import { When } from 'react-if'

interface ProductsResponse {
  status: string,
  result: Book[]
}

async function fetchBooks(url: string) {
  // 模擬 loading 延遲
  if (process.env.NODE_ENV === 'development') {
    await waitTime(1500)
  }

  const { data } = await axios.get<ProductsResponse>(url)
  if (data.status !== 'ok') throw new Error('Server Error')
  return data
}

const Products: NextPage = function () {
  const { data, error } = useSWR('/api/products', fetchBooks)
  if (error) { handleAxiosError(error) }

  const books = data?.result

  return (
    <Layout>
      <Head>
        <title>Fake-Kado | Books</title>
      </Head>

      <When condition={error}>
        <div className="text-center">Failed to fetch data.</div>
      </When>

      <When condition={!books && !error}>
        <div className="text-center">Loading...</div>
      </When>

      <When condition={books?.length}>
        {() => (
          <section>
            <div className="row">
              {books?.map((book) => (
                <article className="col-6 d-flex" key={book.id}>
                  <div className="w-50">
                    <Link href={`/product/${book.id}`}>
                      <a className="d-inline-block">
                        <img src={book.image} className="w-100" alt="" />
                      </a>
                    </Link>
                  </div>
                  <div className="w-50 px-3">
                    <Link href={`/product/${book.id}`}>
                      <a className="h4 text-reset text-decoration-none">{book.name}</a>
                    </Link>
                    <div>{book.author}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </When>

      <style jsx>{`
        .test {
          color: red;
        }
      `}</style>
    </Layout>
  )
}

export default Products
