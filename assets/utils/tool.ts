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