import { NextApiRequest, NextApiResponse } from 'next'
import { books } from '@seeds/books'
import type { Book } from '@seeds/books'
import type { APIResponse } from '@utils/api/types'

export interface ProductsResponse extends APIResponse {
  results: Book[]
}

interface OverrideRequest extends NextApiRequest {
  query: { q: string }
}

export default function controller(req: OverrideRequest, res: NextApiResponse<ProductsResponse>) {
  if (req.method !== 'GET') {
    return res.status(404).json({ status: 'error', results: [] })
  }

  // Search 請求
  const keyWord = req.query.q || ''
  const results = books.filter(
    (book) =>
      book.name.includes(keyWord) ||
      book.categories.some((cateName) => cateName.includes(keyWord)) ||
      book.author.includes(keyWord)
  )

  // Sort by DESC
  results.sort((a, b) => b.id - a.id)

  res.status(200).json({ status: 'ok', results: results })
}
