import { useRouter } from "next/router"
import type { FormEvent, PropsWithChildren } from "react"
import { useState } from 'react'

type SearchBarProps = {
  wrapperClass?: string
  keyword?: string
}

export default function SearchBar (props: PropsWithChildren<SearchBarProps>) {
  const currentKeyword = props.keyword || ''
  const [search, setSearch] = useState(currentKeyword)
  const router = useRouter()

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    const query = search.trim()
    router.push({
      pathname: '/search',
      query: { q: query },
    })
  }

  return (
    <section className={props.wrapperClass}>
      <form action="/products" onSubmit={onSearch}>
        <div className="search-group">
          <span className="search-btn"></span>
          <input
            type="text"
            placeholder="請輸入想搜尋的作品名、分類"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </div>
      </form>

      <style jsx>{`
        .search-group {
          position: relative;
          display: flex;
          justify-content: center;

          & input {
            all: unset;
            width: 100%;
            color: var(--theme-ui-colors-gray-8);
            font-size: 0.875rem;
            letter-spacing: 0.05rem;
            line-height: 1.5rem;
            border: 1px solid var(--theme-ui-colors-gray-8);
            border-radius: 0.25rem;
            padding: 0.9rem 2.75rem;
          }

          & input::placeholder {
            color: var(--theme-ui-colors-gray-5);
          }

          & input:focus {
            border-color: var(--theme-ui-colors-primary);
          }
        }

        .search-btn {
          position: absolute;
          top: 50%;
          left: 0.75rem;
          transform: translateY(-50%);
          width: 1.5rem;
          height: 1.5rem;
          mask-position: center;
          mask-repeat: no-repeat;
          mask: url('/images/search-icon.svg');
          background-color: var(--theme-ui-colors-primary);
          cursor: pointer;
        }
      `}</style>
    </section>
  )
}