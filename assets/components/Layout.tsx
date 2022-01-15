import type { NextPage } from 'next'
import Footer from './Footer'
import Header from './Header'
import Navbar, { NavBarItem } from './Navbar'
import { When } from 'react-if'

interface LayoutProps {
  hasNav?: boolean
}

const Layout: NextPage<LayoutProps> = function ({ children, hasNav }) {
  return (
    <div className="fix-footer-bottom lock-width">
      <Header />

      <When condition={hasNav}>
        {() => (
          <Navbar>
            <NavBarItem text="今日更新" isDisabled />
            <NavBarItem text="完結作品" href="/products" isActive />
            <NavBarItem text="我的小說" isDisabled />
          </Navbar>
        )}
      </When>

      <main className="">{children}</main>

      <Footer />

      <style jsx>{`
        .fix-footer-bottom {
          display: flex;
          flex-flow: column;
          min-height: 100%;
        }

        .lock-width {
          min-width: 320px;
        }

        main {
          flex-grow: 1;
        }
      `}</style>
    </div>
  )
}

export default Layout