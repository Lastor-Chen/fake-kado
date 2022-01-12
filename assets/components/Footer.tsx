import type { NextPage } from 'next'
import Link from 'next/link'

const Footer: NextPage = function () {
  return (
    <footer className="text-white fw-bold text-center py-3">
      <nav className="nav justify-content-center override-link">
        <a className="nav-link col-12 col-sm-3">聯絡我們</a>
        <a className="nav-link col-12 col-sm-3">服務條款</a>
        <a className="nav-link col-12 col-sm-3">隱私權政策</a>
        <a className="nav-link col-12 col-sm-3">常見問題</a>
      </nav>

      <div className="row justify-content-center m-0 py-2">
        <small className="col-sm-6 text-sm-end ps-0 pe-1">
          {'This is a learning side project of Next.js.'}
        </small>
        <small className="col-sm-6 text-sm-start px-0">
          {'For more information, see '}
          <a href="https://github.com/Lastor-Chen/fake-kado" target="_blank" rel="noreferrer">GitHub</a>
          {'.'}
        </small>
      </div>

      <style jsx>{`
        footer {
          background-color: #2d3748;
        }
        .override-link > .nav-link {
          color: white;
          padding: 0.75rem 2rem;
          font-size: 0.875rem;
        }
      `}</style>
    </footer>
  )
}

export default Footer
