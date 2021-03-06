import Layout from '@components/Layout'
import type { GetStaticPaths, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import booksData from '@seeds/books.json'
import type { Book } from '@seeds/books'
import Navbar, { NavBarItem } from '@components/Navbar'
import { useRouter } from 'next/router'
import Spinner from '@components/Spinner'

/** 定義動態路由的 key name */
type StaticPathParam = {
  id?: string
}
type StaticPath = GetStaticPathsResult<StaticPathParam>['paths'][0]

// 決定 pre-render 數量
export const getStaticPaths: GetStaticPaths<StaticPathParam> = async function () {
  // 僅取末 10 筆做 pre-render, 以模擬部署後上架新商品的情況
  const books = booksData.slice(-10)
  const paths = books.map((book): StaticPath => {
    return {
      params: { id: book.id.toString() },
    }
  })

  return {
    paths: paths,
    fallback: true,
  }
}

type ProductProps = {
  product: Book
}

export async function getStaticProps(
  context: GetStaticPropsContext<StaticPathParam>
): Promise<GetStaticPropsResult<ProductProps>> {
  const id = context.params?.id!
  const book = booksData.find((book) => book.id === +id)
  if (!book) return { notFound: true }

  return {
    props: { product: book },
  }
}

// SSG + Dynamic Routes Page
const Product: NextPage<ProductProps> = function ({ product: book }) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Layout>
        <Spinner wrapperClass="py-5" />
      </Layout>
    )
  }

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
              <span>{book.illustrator}</span>
            </div>
            <div className="mt-3 mt-sm-auto">
              <div className="d-flex flex-wrap gap-2">
                {book.categories.map((name, idx) => (
                  <span className="icon-outline-light" key={`tc${idx}`}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3 text-center text-sm-start">
              <button className="my-btn btn-alpha">開始閱讀</button>
            </div>
          </div>
        </div>
      </section>

      <Navbar>
        <NavBarItem text="目錄" isDisabled />
        <NavBarItem text="資訊" isActive />
      </Navbar>

      <article className="container override py-4 px-3 px-sm-5 mb-5">
        <section className="mb-4">
          <h6 className="fw-bold mb-5">{book.name}</h6>
          <pre className="desc small mb-0">{book.desc}</pre>
        </section>
        <section className="mb-4">
          <h6 className="fw-bold mb-4">作者</h6>
          <div className="d-flex align-items-center">
            <div className="me-3">
              <Image src="/images/author-icon.svg" width="80" height="80" alt="" />
            </div>
            <span>{book.author}</span>
          </div>
        </section>
        <section>
          <h6 className="fw-bold mb-4">分類</h6>
          <div className="d-flex flex-wrap gap-2 small">
            {book.categories.map((name, idx) => (
              <span className="icon-primary" key={`bc${idx}`}>
                {name}
              </span>
            ))}
          </div>
        </section>
      </article>

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
        }

        .my-btn {
          display: inline-block;
          width: 75%;
          max-width: 256px;
          border-radius: 50rem;
          cursor: auto;

          &.btn-alpha {
            color: white;
            background-color: transparent;
            border: 1px solid white;
            padding: 0.75rem 0;
          }
        }

        .container.override {
          max-width: 1024px;

          .desc {
            color: var(--theme-ui-colors-gray-7);
            line-height: 2;
            letter-spacing: 0.05em;
            white-space: pre-wrap;
          }
        }

        .icon-outline-light {
          color: white;
          padding: 0.25rem 0.5rem;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50rem;
        }

        .icon-primary {
          color: white;
          padding: 0.75rem 1rem;
          background-color: var(--theme-ui-colors-primary);
          border-radius: 50rem;
        }
      `}</style>
    </Layout>
  )
}

export default Product
