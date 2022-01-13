import { NextApiRequest, NextApiResponse } from 'next'
import { books } from '@seeds/books'
import type { Book } from '@seeds/books'
import type { APIResponse } from '@utils/api/types'

export interface Response extends APIResponse {
  results: Book[]
}

export default function controller(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method !== 'GET') {
    return res.status(404).json({ status: 'error', results: [] })
  }

  res.status(200).json({ status: 'ok', results: books })
}
