import { NextApiRequest, NextApiResponse } from 'next'
import books from '@seeds/books.json'
import type { Book } from '@seeds/books'
import type { APIResponse } from '@utils/api/types'

/** Request query string 定義 */
export type ProductsQueryString = {
  q?: string
  order?: 'ASC' | 'DESC'
}
interface ProductsRequest extends NextApiRequest {
  query: ProductsQueryString
}

/** 定義此 API 回傳值 */
export interface ProductsResponse extends APIResponse {
  results: Book[]
}

export default function controller(req: ProductsRequest, res: NextApiResponse<ProductsResponse>) {
  if (req.method !== 'GET') {
    return res.status(404).json({ status: 'error', results: [] })
  }

  // Search 請求
  let order = req.query.order
  if (order !== 'ASC' && order !== 'DESC') {
    order = 'DESC'
  }

  let results = books
  if (req.query.q) {
    const keyword = req.query.q || ''
    results = books.filter(
      (book) =>
        book.name.includes(keyword) ||
        book.categories.some((cateName) => cateName.includes(keyword)) ||
        book.author.includes(keyword)
    )
  }

  // Sort by DESC
  results.sort((a, b) => b.id - a.id)

  res.status(200).json({ status: 'ok', results: results })
}
