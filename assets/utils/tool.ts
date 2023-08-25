import axios from 'axios'
import type { ProductsResponse, ProductsQueryString } from '@pages/api/products'

/** 手動製作讀取延遲, 開發時用來觀察 Loading UI */
export function waitTime(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), ms)
  })
}

export function handleAxiosError(err: any) {
  if (axios.isAxiosError(err)) {
    console.log('Bad Request:', err.response?.statusText)
  } else {
    console.log('Unexpected', err)
  }
}

/** 取得 fetch 時的 hostname */
export function getAPIBaseURL() {
  // 僅部署後會設置 HOST 環境變數
  return process.env.HOST ? `https://${process.env.HOST}` : `http://localhost:3000`
}

export async function fetchBooks(url: string, limit: number, pageIdx: number, keyword?: string, baseURL?: string) {
  console.log({ keyword, limit, pageIdx })
  const params: ProductsQueryString = {
    q: keyword,
    order: 'DESC',
    limit: limit.toString(),
    page: pageIdx.toString(),
  }
  const { data } = await axios.get<ProductsResponse>(url, { params, baseURL })
  if (data.status !== 'ok') throw new Error('Server Error')
  return data
}



export async function fetchBooks2(params) {
  console.log('params', params)
  const response = await axios.get<ProductsResponse>('/api/products', {
    params: {
      q: '',
      order: 'DESC',
      limit: 10,
      page: 1,
    }
  })
  console.log('response', response)

  return response.data
}