import type { NextPage } from 'next'
import Footer from './Footer'
import Header from './Header'
import Navbar from './Navbar'

const Layout: NextPage = function ({ children }) {
  return (
    <div className="fix-footer-bottom lock-width">
      <Header />
      <Navbar />

      <main className="container override px-2 py-5">{children}</main>

      <Footer />

      <style jsx>{`
        .fix-footer-bottom {
          display: flex;
          flex-flow: column;
          height: 100%;
        }

        .lock-width {
          min-width: 320px;
        }

        .container.override {
          max-width: 1000px;
          flex-grow: 1;
        }
      `}</style>
    </div>
  )
}

export default Layout