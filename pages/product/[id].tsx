import Layout from '@components/Layout'
import type { GetServerSideProps } from 'next'
import type { PropsWithChildren } from 'react'
import type { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import Link from 'next/link'

interface ProductProps {
  id: string,
}

export default function Product({ id }: PropsWithChildren<ProductProps>) {
  return (
    <Layout>
      <Head>
        <title>{id}</title>
      </Head>
      <h1>Product {id}</h1>

      <Link href="/products">
        <a>back</a>
      </Link>

    </Layout>
  )
}

interface ServerSideProps extends ProductProps, ParsedUrlQuery {}

export const getServerSideProps: GetServerSideProps<{}, ServerSideProps> = async function (context) {
  return {
    props: { id: context.params?.id },
  }
}
