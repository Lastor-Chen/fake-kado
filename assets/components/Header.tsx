import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const Header: NextPage = function () {
  const btnNames = ['light', 'bell', 'member']

  const wrapperDOM = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY
      if (currentScrollY > 500) {
        wrapperDOM.current!.style.top = '-64px'
      } else {
        wrapperDOM.current!.style.top = '0px'
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky d-flex justify-content-between align-items-center px-3 bg-white" ref={wrapperDOM}>
      <Link href="/products">
        <a className="next-img-fix">
          <Image src="/images/kado-logo.svg" width="64" height="64" alt="logo" />
        </a>
      </Link>

      <div className="d-flex">
        {btnNames.map((btn, idx) => (
          <button className="btn next-img-fix ms-4 p-0" key={`b${idx}`} disabled>
            <div className={`icon ${btn}`}></div>
          </button>
        ))}
      </div>

      <style jsx>{`
        .sticky {
          position: sticky;
          z-index: 10;
          transition: top .2s linear;
        }

        .icon {
          width: 1.5rem;
          height: 1.5rem;
          background-color: var(--theme-ui-colors-gray-9);
          mask: no-repeat center;
        }

        .btn:disabled {
          opacity: 0.4;
        }

        .bell {
          mask: url(/images/bell.svg);
        }

        .member {
          mask: url(/images/member.svg);
        }

        .light {
          mask: url(/images/switch-light.svg);
        }
      `}</style>
    </header>
  )
}

export default Header
