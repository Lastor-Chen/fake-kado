import { NextApiRequest, NextApiResponse } from 'next'
import books from '@seeds/books.json'
import type { Book } from '@seeds/books'
import type { APIResponse } from '@utils/api/types'

/** Request 動態路由 params 定義 */
export type ProductQueryParams = {
  id?: string
}
interface ProductRequest extends NextApiRequest {
  query: ProductQueryParams
}

/** 定義此 API 回傳值 */
export interface ProductResponse extends APIResponse {
  results: Book | null
}

export default function controller(req: ProductRequest, res: NextApiResponse<ProductResponse>) {
  if (req.method !== 'GET') {
    return res.status(404).json({ status: 'error', results: null })
  }

  const productId = req.query.id
  const book = books.find((book) => book.id === Number(productId))
  if (!book) {
    res.status(404).json({ status: 'error', results: null })
  }

  res.status(200).json({ status: 'ok', results: book || null })
}
