import Layout from '@components/Layout'
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import type { PropsWithChildren } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
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
        <title>
          {book.author} | {book.name}
        </title>
      </Head>

      <section className="px-3 py-5 position-relative">
        <div className="bg-box mask">
          <div className="bg next-img-fix position-relative">
            <Image src={book.image} layout="fill" objectFit="cover" objectPosition="50% 10%" priority={true} alt="" />
          </div>
        </div>
        <div className="d-flex flex-wrap row-cols-1 row-cols-sm-2">
          <div className="col text-center text-sm-end mb-4 mb-sm-0">
            <div className="bevel align-middle next-img-fix">
              <Image src={book.image} width="299" height="427" alt={book.name} />
            </div>
          </div>
          <div className="book-info col px-2 px-sm-5 small text-white">
            <div className="fw-bold fs-5 mb-3">{book.name}</div>
            <div className="my-1">
              <span className="me-2">作者</span>
              <span>{book.author}</span>
            </div>
            <div className="my-1">
              <span className="me-2">繪師</span>
              <span>{book.author}</span>
            </div>
            <div className="mt-3 mt-sm-auto">
              <div className="d-flex flex-wrap gap-2">
                <span className="tag-icon">戀愛言情</span>
                <span className="tag-icon">歡樂搞笑</span>
              </div>
            </div>
            <div className="mt-3 text-center text-sm-start">
              <button className="w-75 my-btn btn-alpha">開始閱讀</button>
            </div>
          </div>
        </div>
      </section>

      <section className="container override px-3 px-sm-5">
        <Link href="/products">
          <a>back</a>
        </Link>
      </section>

      <style jsx>{`
        .bg-box {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;

          &.mask:before {
            content: '';
            display: block;
            background-color: rgb(26, 32, 44);
            opacity: 0.7;
            width: 100%;
            height: 100%;
            position: absolute;
          }

          .bg {
            position: absolute;
            z-index: -1;
            width: 100%;
            height: 100%;
            filter: blur(5px);
          }
        }

        .bevel {
          display: inline-block;
          border-radius: 0.25rem;
          overflow: hidden;
        }

        .book-info {
          z-index: 1;
          display: flex;
          flex-flow: column;

          & .tag-icon {
            padding: 0.25rem 0.5rem;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50rem;
          }
        }

        .my-btn {
          display: inline-block;
          border-radius: 50rem;
          cursor: pointer;

          &.btn-alpha {
            color: white;
            background-color: transparent;
            border: 1px solid white;
            padding: 0.75rem 0;
          }
        }


        .container.override {
          max-width: 1024px;
        }
      `}</style>
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
