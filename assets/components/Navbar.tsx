import { NextPage } from 'next'

const Navbar: NextPage = function () {
  return (
    <nav className="temp-nav">
      {'Navbar'}

      <style jsx>{`
        .temp-nav {
          position: sticky;
          top: 4rem;
          width: 100%;
          height: 50px;
          background-color: gray;
        }
      `}</style>
    </nav>
  )
}

export default Navbar