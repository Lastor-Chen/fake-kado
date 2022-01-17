// 後端 API 共用 type 定義

export interface APIResponse {
  status: 'ok' | 'error'
  results: any // 由各 controller 定義
}
