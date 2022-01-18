# Fake Kado

<img src="https://i.imgur.com/zyUivvW.png" width="400">

臨摹台灣角川 [KadoKado](https://www.kadokado.com.tw/) 輕小說平台之 [Next.js](https://nextjs.org/) side project.

<br/>

本專案部署於 [Vercel](https://vercel.com/)，可直接線上預覽觀看：<br/>
[Preview on Vercel](https://fake-kado.vercel.app/)

### Content List
- [Overview](#overview)
- [Installing & Started](#installing--started)
- [Server Side API](#server-side-api)
- [Data Seeding](#data-seeding)

## Overview
- User 可以瀏覽所有商品
- User 可以查看個別商品詳細
- User 可以依書名、分類名、作者名搜尋商品
- 主動式滾動下拉分頁
- RWD 自適應
- Header、Navbar 置頂 sticky + scroll 特效
- 設置後端 `GET /api/products`, `GET /api/product/:id` API，模擬前後端分離的情況

全面使用 Typescript 進行規範，並製作共用組件以複用 HTML 與邏輯塊。<br/>
有稍微做一下 Facebook 預覽的 SEO，圖片是拉 Next.js 官方的圖。<br/>

<br/>

實作了 3 個頁面，分別使用 Next.js 三種不同的渲染方式。
- 所有商品頁 `/products` ，SSG without data + CSR
- 個別商品詳細頁 `/product/:id`，SSG with data
- 商品搜尋頁 `/search?q=[...]` ，SSR + CSR

所有商品頁，使用 CSR fetch 主資料、分頁加載，並搭配 SSG 預渲染 Header 與 Footer。使用 `useSWRInfinite`。<br/>
商品詳細頁，使用 SSG，商品總筆數為 53 筆，設定僅預渲染末 10 筆，以模擬 build 後才上架新商品的情況。<br/>
商品搜尋頁，由 SSR 提供第一頁商品，後續分頁由 Client 端 fetch。使用 `useSWR`。<br/>

## Installing & Started

本地端啟動，請直接 clone 此專案。
```bash
$ git clone https://github.com/Lastor-Chen/fake-kado
```

如不需要 git history，可使用 [degit](https://github.com/Rich-Harris/degit) 進行無 git 紀錄的專案下載。
```bash
$ npx degit Lastor-Chen/fake-kado
```

本專案使用 yarn 進行套件管理，建議使用 yarn 安裝依賴。
```bash
$ yarn install
```

依賴套件安裝完成後，使用 create-next-app 預設指令啟動。Enjoy it!!
```bash
$ yarn dev
or
$ npm run dev
```

※注意，此專案 fetch API 目標 host，預設 dev 模式寫死為 `localhost:3000`，如 port 3000 已被占用，可至 `assets/utils/tool.ts` 手動修改連線 port.
```ts
function getAPIBaseURL() {
  return process.env.HOST ? `https://${production_host}` : `http://${development_host}:3000`
}
```

## Server Side API

#### GET `/api/products?q={}&order={}&limit={}&page={}`

| Query String | description | default | required |
| -------- | -------- | -------- | -------- |
| q | 搜尋關鍵字 | undefined | false |
| order | "DESC" or "ASC" | "DESC" | false |
| limit | 分頁筆數 | undefined | false |
| page | 請求的頁數 | undefined | false |

※ limit 與 page 需搭配使用

#### GET `/api/product/:id`

| Query Params | description | default | required |
| -------- | -------- | -------- | -------- |
| id | 商品 id | undefined | true |

※ 這支 API 最終前端沒用到

## Data Seeding

此專案未建置 database，自製了一個 seed 產生器，生成靜態 JSON 檔作為假資料進行開發。<br/>
文字類假資料，由於 Faker.js 作者 endgame 了，改用 [casual](https://github.com/boo1ean/casual) 來生假資料。<br/>
圖片類假資料使用 [Lorem Picsum API](https://picsum.photos)。<br/>

假資料設置 50 筆，外加 3 筆手動從 KadoKado 上擷取下來的特規資料，總計 53 筆。<br/>

#### Run seed
```
$ yarn seed
```

該指令將執行位於 `assets/seeds/books.seed.js` 的產生器，生成新的 `books.json`。<br/>
專案已內置了一組假資料，不需重新生成即可啟動專案。
