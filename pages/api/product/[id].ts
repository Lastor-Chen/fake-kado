import { NextApiRequest, NextApiResponse } from 'next'
import { books } from '@seeds/books'
import type { Book } from '@seeds/books'
import type { APIResponse } from '@utils/api/types'

export type QueryParam = {
  id?: string
}

export interface Response extends APIResponse {
  results: Book | null
}

export default function controller(req: NextApiRequest, res: NextApiResponse<Response>) {
  console.log(`${req.method} /api/product/[id]`)

  if (req.method !== 'GET') {
    return res.status(404).json({ status: 'error', results: null })
  }

  const query: QueryParam = req.query
  const productId = query.id
  const book = books.find((book) => book.id === Number(productId))
  res.status(200).json({ status: 'ok', results: book || null })
}
