import { NextPage } from 'next'

const Navbar: NextPage = function () {
  return (
    <nav className="sticky bg-white">
      <div className="nav justify-content-center override-nav override-link">
        <a className="nav-link disabled">今日更新</a>
        <a className="nav-link active">完結作品</a>
        <a className="nav-link disabled">我的小說</a>
      </div>

      <style jsx>{`
        .sticky {
          position: sticky;
          top: 4rem;
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