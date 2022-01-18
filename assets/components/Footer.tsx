export default function Footer() {
  return (
    <footer className="text-white fw-bold text-center py-3">
      <nav className="nav flex-column flex-sm-row justify-content-center override-link">
        <a className="nav-link">聯絡我們</a>
        <a className="nav-link">服務條款</a>
        <a className="nav-link">隱私權政策</a>
        <a className="nav-link">常見問題</a>
      </nav>

      <div className="d-flex flex-column d-sm-block py-2">
        <small className="">{'This is a learning side project of Next.js. '}</small>
        <small className="">
          {'For more information, see '}
          <a href="https://github.com/Lastor-Chen/fake-kado" target="_blank" rel="noreferrer">
            GitHub
          </a>
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
