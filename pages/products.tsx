import Layout from '@components/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '@components/ProductCard'
import type { Book } from '@seeds/books'

interface ProductsResponse {
  status: string,
  result: Book[]
}

const Products: NextPage = () => {
  const [books, setBooks] = useState<Book[]>([])
  console.log('books', books)

  useEffect(() => {
    if (!books.length) {
      // 假 Loading 延遲
      setTimeout(() => {
        axios.get<ProductsResponse>('/api/products').then(({ data }) => {
          const books = data.result
          setBooks(books)
        })
      }, 1500)
    }
  })

  return (
    <Layout>
      <Head>
        <title>Fake-Kado | Products</title>
      </Head>

      {!books.length ? (
        <div>Loading...</div>
      ) : (
        <article>
          <div className="row">
            {books.map((book) => (
              <div className="col-6 d-flex" key={book.id}>
                <div className="w-50">
                  <img src={book.image} className="w-100" alt="" />
                </div>
                <div className="w-50 px-3">
                  <h4>{book.name}</h4>
                  <div>{book.author}</div>
                </div>
              </div>
            ))}
          </div>
        </article>
      )}

      <style jsx>{`
        .test {
          color: red;
        }
      `}</style>
    </Layout>
  )
}

export default Products
