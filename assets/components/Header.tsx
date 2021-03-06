import Image from 'next/image'
import Link from 'next/link'
import StickyScrollEffect from '@components/StickyScrollEffect'

export default function Header() {
  const btnNames = ['light', 'bell', 'member']

  return (
    <StickyScrollEffect checkPoint={550} initTop="0" movement="-4rem">
      <header className="sticky d-flex justify-content-between align-items-center px-3 bg-white">
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
            transition: top 0.2s linear;
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
    </StickyScrollEffect>
  )
}
