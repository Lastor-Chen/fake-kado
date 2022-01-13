import { NextApiRequest, NextApiResponse } from 'next'
import { books } from '@seeds/books'

export default function controller(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(404).json({ status: 'Not Found', result: null })
  }

  res.status(200).json({
    status: 'ok',
    result: books,
  })
}
