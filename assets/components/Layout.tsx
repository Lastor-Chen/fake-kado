import Footer from './Footer'
import Header from './Header'
import Navbar, { NavBarItem } from './Navbar'
import { When } from 'react-if'
import { PropsWithChildren } from 'react'

interface LayoutProps {
  hasNav?: boolean
}

export default function Layout({ children, hasNav }: PropsWithChildren<LayoutProps>) {
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

      <main>{children}</main>

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
