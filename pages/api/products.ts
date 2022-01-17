import { NextApiRequest, NextApiResponse } from 'next'
import books from '@seeds/books.json'
import type { Book } from '@seeds/books'
import type { APIResponse } from '@utils/api/types'

/** Request query string 定義 */
export type ProductsQueryString = {
  q?: string
  order?: 'ASC' | 'DESC'
  /** 字串 number, 一頁幾筆, 需搭配 page key */
  limit?: string
  /** 字串 number, 第幾頁, 需搭配 limit key */
  page?: string
}
interface ProductsRequest extends NextApiRequest {
  query: ProductsQueryString
}

/** 定義此 API 回傳值 */
export interface ProductsResponse extends APIResponse {
  count?: number
  totalPage?: number
  page?: number
  results: Book[]
}

export default function controller(req: ProductsRequest, res: NextApiResponse<ProductsResponse>) {
  if (req.method !== 'GET') {
    return res.status(404).json({ status: 'error', results: [] })
  }

  // Search 請求
  let searchedBooks: Book[] = books
  if (req.query.q) {
    const keyword = req.query.q || ''
    searchedBooks = books.filter(
      (book) =>
        book.name.includes(keyword) ||
        book.categories.some((cateName) => cateName.includes(keyword)) ||
        book.author.includes(keyword)
    )
  }

  // Sort
  let order = req.query.order!
  if (order !== 'ASC' && order !== 'DESC') {
    order = 'DESC'
  }
  searchedBooks.sort((a, b) => {
    if (order === 'DESC') return b.id - a.id
    else return a.id - b.id
  })

  // 切分頁
  let results = searchedBooks
  let totalPage: number | undefined = undefined
  let page: number | undefined = undefined
  let count: number | undefined = undefined
  if (req.query.limit && req.query.page) {
    const limit = Number(req.query.limit)
    page = Number(req.query.page)
    totalPage = Math.ceil(searchedBooks.length / limit)

    const offset = limit * (page - 1)
    results = searchedBooks.slice(offset, limit * page)
    count = searchedBooks.length
  }

  res.status(200).json({ status: 'ok', count, totalPage, page, results })
}
