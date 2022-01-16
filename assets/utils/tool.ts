import axios from 'axios'

export function waitTime(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), ms)
  })
}

export function handleAxiosError(err: any) {
  if (axios.isAxiosError(err)) {
    console.log('Bad Request:', err.response?.statusText);
  } else {
    console.log('Unexpected', err);
  }
}

/** 取得 fetch 時的 hostname */
export function getAPIBaseURL() {
  // 僅部署後會設置 HOST 環境變數
  return process.env.HOST ? `https://${process.env.HOST}` : `http://localhost:3000`
}