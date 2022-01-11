import type { NextPage } from 'next'
import Link from 'next/link'

const Footer: NextPage = function () {
  return (
    <footer className="text-white fw-bold text-center py-3">
      <nav className="nav justify-content-center override-link">
        <a className="nav-link">聯絡我們</a>
        <a className="nav-link">服務條款</a>
        <a className="nav-link">隱私權政策</a>
        <a className="nav-link">常見問題</a>
      </nav>
      <small className="d-block py-2">
        {'This is a learning side project of Next.js. For more information, see '}
        <a href="https://github.com/Lastor-Chen/fake-kado" target="_blank" rel="noreferrer">GitHub</a>
        {'.'}
      </small>

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
