export interface APIResponse {
  status: 'ok' | 'error'
  results: any // 由各 controller 定義
}
