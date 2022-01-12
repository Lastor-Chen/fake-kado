import type { NextPage } from 'next'
import Footer from './Footer'
import Header from './Header'
import Navbar from './Navbar'

const Layout: NextPage = function ({ children }) {
  return (
    <div className='fix-footer-bottom lock-width'>
      <Header />
      <Navbar />

      <main className='container fill-height py-4'>
        {children}
      </main>

      <Footer />

      <style jsx>{`
        .fix-footer-bottom {
          display: flex;
          flex-flow: column;
          justify-content: space-between;
        }

        .lock-width {
          min-width: 320px;
        }

        .fill-height {
          min-height: 100%;
          height: 100vh;
        }
      `}</style>
    </div>
  )
}

export default Layout