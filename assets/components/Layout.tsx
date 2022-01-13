import type { NextPage } from 'next'
import Footer from './Footer'
import Header from './Header'
import Navbar from './Navbar'
import { When } from 'react-if'

interface LayoutProps {
  hasNav?: boolean
}

const Layout: NextPage<LayoutProps> = function ({ children, hasNav }) {
  return (
    <div className="fix-footer-bottom lock-width">
      <Header />

      <When condition={hasNav}>
        <Navbar />
      </When>

      <main className="container override px-3 px-sm-5">{children}</main>

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

        .container.override {
          max-width: 1024px;
          flex-grow: 1;
        }
      `}</style>
    </div>
  )
}

export default Layout