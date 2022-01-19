import { useRouter } from 'next/router'
import { FormEvent, PropsWithChildren, useEffect, useRef } from 'react'
import { useState } from 'react'

type SearchBarProps = {
  wrapperClass?: string
  keyword?: string
}

export default function SearchBar(props: PropsWithChildren<SearchBarProps>) {
  const currentKeyword = props.keyword || ''
  const [keyword, setKeyword] = useState(currentKeyword)
  const router = useRouter()

  // 防止同一關鍵字連續 query
  const isSearching = useRef(false)
  useEffect(() => {
    isSearching.current = false
  }, [keyword])

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    if (isSearching.current) return void 0
    isSearching.current = true

    const query = keyword.trim()
    router.push({
      pathname: '/search',
      query: { q: query },
    })
  }

  const hideCancelBtn = keyword ? '' : 'invisible'
  return (
    <section className={props.wrapperClass}>
      <form action="/products" onSubmit={onSearch}>
        <div className="search-group">
          <span className="my-btn search-btn" onClick={onSearch}></span>
          <input
            type="text"
            placeholder="請輸入想搜尋的作品名、分類"
            value={keyword}
            onChange={(e) => setKeyword(e.currentTarget.value)}
          />
          <span className={`my-btn cancel-btn ${hideCancelBtn}`} onClick={() => setKeyword('')}></span>
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

        .my-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 1.5rem;
          height: 1.5rem;
          cursor: pointer;

          &.search-btn {
            left: 0.75rem;
            mask: url('/images/search-icon.svg') center no-repeat;
            background-color: var(--theme-ui-colors-primary);
          }

          &.cancel-btn {
            right: 0.75rem;
            mask: url('/images/x-cancel.svg') center no-repeat;
            background-color: var(--theme-ui-colors-gray-5);
          }
        }
      `}</style>
    </section>
  )
}
