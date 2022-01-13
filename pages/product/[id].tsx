import Layout from '@components/Layout'
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import type { PropsWithChildren } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { books } from '@seeds/books'
import type { Book } from '@seeds/books'
import type { QueryParam } from '../api/product/[id]'

interface ProductProps {
  product: Book
}

export default function Product({ product: book }: PropsWithChildren<ProductProps>) {
  return (
    <Layout>
      <Head>
        <title>{book.name}</title>
      </Head>
      <h1>Product {book.id}</h1>

      <Link href="/products">
        <a>back</a>
      </Link>
    </Layout>
  )
}

export const getServerSideProps = async function (
  context: GetServerSidePropsContext<QueryParam>
): Promise<GetServerSidePropsResult<ProductProps>> {
  const productId = context.params?.id
  const book = books.find((book) => book.id === Number(productId))

  if (!book) return { notFound: true }

  return {
    props: { product: book },
  }
}
