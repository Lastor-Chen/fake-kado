import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const Header: NextPage = function () {
  const btnNames = ['light', 'bell', 'member']

  return (
    <header className="d-flex justify-content-between align-items-center px-3">
      <Link href="/">
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
        .icon {
          width: 1.5rem;
          height: 1.5rem;
          background-color: gray;
          mask: no-repeat center;
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
