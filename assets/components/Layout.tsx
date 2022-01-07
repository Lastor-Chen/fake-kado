import type { NextPage } from 'next'
import Footer from './Footer'
import Header from './Header'

const Layout: NextPage = function ({ children }) {
  return (
    <div className='fix-footer-bottom'>
      <Header />
      <main className='container h-100'>
        {children}
      </main>
      <Footer />

      <style jsx>{`
        .fix-footer-bottom {
          display: flex;
          height: 100%;
          flex-flow: column;
          justify-content: space-between;
        }
      `}</style>
    </div>
  )
}

export default Layout