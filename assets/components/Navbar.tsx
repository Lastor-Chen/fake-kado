import { NextPage } from 'next'
import Link from 'next/link'
import React, { isValidElement } from 'react'
import { If, Then, Else } from 'react-if'
import type { UrlObject } from 'url'

type NavBarItemProps = {
  text: string
  href?: string | UrlObject
  isActive?: boolean
  isDisabled?: boolean
}

/** 僅作為 Navbar children 屬性定義用 */
export function NavBarItem(props: {
  text: string
  href?: string | UrlObject
  isActive?: boolean
  isDisabled?: boolean
}) {
  return <></>
}

/**
 * 需搭配 NavBarItem 使用
 * ```
 * <Navbar>
 *   <NavBarItem text="Active" href="/home" isActive isDisabled>
 *   <NavBarItem text="Disabled" isDisabled>
 * </Navbar>
 * ```
 */
const Navbar: NextPage = function (props) {
  const children = props.children

  // children 必須為 ReactElement | ReactElement[]
  if (Array.isArray(children)) {
    if (children.some((child) => !isValidElement(child))) {
      throw new TypeError('Children of Navbar Component must to be ReactElement')
    }
  } else {
    if (!isValidElement(children)) {
      throw new TypeError('Children of Navbar Component must to be ReactElement')
    }
  }

  return (
    <nav className="sticky bg-white">
      <div className="nav justify-content-center override-nav override-link">
        {React.Children.map(children, (child: React.ReactElement<NavBarItemProps>) => {
          const active = child.props.isActive ? 'active' : null
          const disabled = child.props.isDisabled ? 'disabled' : null
          const url = child.props.href
          return (
            <If condition={Boolean(url)}>
              <Then>
                {() => (
                  <Link href={url!}>
                    <a className={`nav-link ${active} ${disabled}`}>{child.props.text}</a>
                  </Link>
                )}
              </Then>
              <Else>
                <a className={`nav-link ${active} ${disabled}`}>{child.props.text}</a>
              </Else>
            </If>
          )
        })}
      </div>

      <style jsx>{`
        .sticky {
          position: sticky;
          top: 4rem;
          z-index: 10;
        }

        .override-nav {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          text-align: center;
        }

        .override-link > .nav-link {
          color: var(--theme-ui-colors-gray-9);
          padding: 0.75rem 0;
          font-size: 0.875rem;
          font-weight: bold;
          width: calc(100% / 3);
        }

        .nav-link.active {
          border-bottom: 2px solid #ff8674;
        }

        .override-link .disabled {
          opacity: 0.4;
        }
      `}</style>
    </nav>
  )
}

export default Navbar