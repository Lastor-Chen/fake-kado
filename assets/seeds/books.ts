// 商品假資料
// 圖片假資料: https://picsum.photos
// 文字假資料: https://github.com/boo1ean/casual

import casual from 'casual'
const casualJP = (<any>casual).ja_JP as typeof casual

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
const categories = ['戀愛言情', '異世界奇幻', '歡樂搞笑', '都市現代', '犯罪推理懸疑']

// 隨機假資料
const fakeBooks = [...Array(count)].map((_, idx): Book => {
  return {
    id: idx,
    name: casual.title,
    author: casualJP.username,
    illustrator: casualJP.username,
    image: `https://picsum.photos/seed/book${idx}/${imgSize}`,
    desc: genDesc(3),
    categories: genRandomCategories(),
  }
})

// 特規資料
const customization: Book[] = [
  {
    id: count + 1,
    name: 'TIGER×DRAGON！',
    author: '竹宮 ゆゆこ',
    illustrator: 'ヤス',
    image: 'https://i.imgur.com/tYPx4YM.png',
    desc: `★竹宮ゆゆこ繼《我們的田村同學》之後推出的作品。推出之後利用大為轟動，並於2008年動畫化。\n\n光靠眼睛就能讓人膽寒，其實只是個普通高中生的高須竜兒，\n在新學期第一天就被體型嬌小、個性兇狠的「掌中老虎」逢坂大河狠狠蹂躪，\n可是也結下兩人的不解之緣……`,
    categories: ['戀愛言情', '都市現代'],
  },
  {
    id: count + 2,
    name: '那片大陸上的故事 ～艾莉森＆維爾＆莉莉亞＆特雷茲＆梅格＆賽隆＆其他～',
    author: '時雨沢 惠一',
    illustrator: '黑星紅白',
    image: 'https://i.imgur.com/Y7S0L9S.png',
    desc: `★串連《艾莉森》《莉莉亞＆特雷茲》《梅格＆賽隆》的故事。\n★時雨沢惠一 × 黑星紅白獻上全系列完結篇！\n\n在艾莉森的目送下，特拉伐斯少校搭乘軍用機出發。\n不過，在那之後機體卻發生爆炸，並墜落到路妥尼河中――\n另一方面，在莉莉亞所就讀的第四高等學校內，\n新聞社成員開始圍繞著「神祕轉學生」特雷茲，在校內展開大調查。\n於是，發生於臨時置物櫃的可疑現象意外地變得明朗。他們逐漸地被捲入重大事件……\n時雨沢惠一所獻上的刺激冒險故事×臉紅心跳、緊張萬分、雀躍不已、吵吵鬧鬧的校園故事完結篇上集！\n那些令人懷念的角色們也會齊聚一堂喔。`,
    categories: ['異世界奇幻', '戀愛言情', '犯罪推理懸疑'],
  },
  {
    id: count + 3,
    name: '喪女會的不當日常',
    author: '海冬 零兒',
    illustrator: '赤坂アカ',
    image: 'https://i.imgur.com/uyrbXWu.png',
    desc: '社團名：\n「讓校園生活更加充實、脫離頹喪的善男信女協會社」，簡稱「喪女會」。 目的：\n歌頌青春！ 成員：\n1. 千種學姊，我親愛的青春☆傻大姊。\n2. 繭，化學實驗狂，獨占學姊的寵愛，我好嫉妒。\n3. 有理，我的表妹暨義妹，暴力女。\n4. 雛子，掛名社員，重度百合。\n5. 我，花輪迴，拜託別再把我當女生了。 我們「喪女會」即使不受歡迎毫無章法，但是還算穩定。\n直到遇見那名少女，我才知道我們其實一直過著「不當」的日常──',
    categories: ['戀愛言情', '歡樂搞笑'],
  },
]

export const books = fakeBooks.concat(customization)

// Tool Function
// ================

// 隨機生成 Categories, 不重覆
function genRandomCategories() {
  const count = randomNum(categories.length)
  const clone = [...categories]
  clone.sort(() => Math.random() - 0.5)
  return [...Array(count)].map(() => {
    return clone.splice(0, 1)[0]
  })
}

/** 隨機生成 Book desc 資訊描述 */
function genDesc(sentenceCount: number) {
  return [...Array(sentenceCount)].map(() => casual.sentences(randomNum(10))).join('\n')
}

/** 隨機生成整數 1 ~ max */
function randomNum(max: any) {
  return Math.floor(Math.random() * max) + 1
}
