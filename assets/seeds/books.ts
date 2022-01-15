// 商品假資料
// 圖片假資料: https://picsum.photos
// 文字假資料: https://github.com/boo1ean/casual

import casual from 'casual'

export interface Book {
  id: number
  name: string
  author: string
  illustrator: string
  image: string
  desc: string
  categories: string[]
}

const count = 50 // 商品總數
const imgSize = '1000/1426' // {長}/{寬}
const categories = ['戀愛言情', '異世界奇幻', '歡樂搞笑']

export const books = [...Array(count)].map((_, idx): Book => {
  return {
    id: idx,
    name: casual.title,
    author: casual.name,
    illustrator: casual.name,
    image: `https://picsum.photos/seed/book${idx}/${imgSize}`,
    desc: genDesc(),
    categories: genRandomCategories(),
  }
})

// Tool Function
// ================

// 隨機生成分類, 不重覆
function genRandomCategories() {
  const count = randomNum(categories.length)
  const clone = [...categories]
  clone.sort(() => Math.random() - 0.5)
  return Array.from(Array(count), () => {
    return clone.splice(0, 1)[0]
  })
}

/** 隨機生成 Book 資訊描述 */
function genDesc() {
  return Array.from(Array(3), () => casual.sentences(randomNum(10))).join('\n')
}

/** 隨機生成整數 1 ~ max */
function randomNum(max: any) {
  return Math.floor(Math.random() * max) + 1
}
