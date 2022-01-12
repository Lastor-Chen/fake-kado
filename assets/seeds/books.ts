// 商品假資料

export interface Book {
  id: number
  name: string
  author: string
  image: string
}

export const books = [...Array(10)].map((_, idx): Book => {
  return {
    id: idx,
    name: '書名',
    author: '作者',
    image:
      'https://www.kadokado.com.tw/_next/image?url=https%3A%2F%2Fstorage.kadokado.com.tw%2FownerId%252F45%252Fcover%252F8c6168ea3a73ede1a242d2de89d9eee3%252Fblob&w=1920&q=75',
  }
})
