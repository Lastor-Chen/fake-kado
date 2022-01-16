import { NextApiRequest, NextApiResponse } from 'next'
import books from '@seeds/books.json'
import type { Book } from '@seeds/books'
import type { APIResponse } from '@utils/api/types'

export interface ProductsResponse extends APIResponse {
  results: Book[]
}

/** Request query string 定義 */
export type ProductsQueryString = {
  q?: string
  order?: 'ASC' | 'DESC'
}
interface ProductsRequest extends NextApiRequest {
  query: ProductsQueryString
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

  const keyword = req.query.q || ''
  const results = books.filter(
    (book) =>
      book.name.includes(keyword) ||
      book.categories.some((cateName) => cateName.includes(keyword)) ||
      book.author.includes(keyword)
  )

  // Sort by DESC
  results.sort((a, b) => b.id - a.id)

  res.status(200).json({ status: 'ok', results: results })
}
