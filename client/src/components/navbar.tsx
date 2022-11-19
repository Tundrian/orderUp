import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="fixed top-0 navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to={`/home`}>Order Up</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li><Link to={`/protected`}>Protected</Link></li>
          <li tabIndex={0}>
            <a>
              Auth
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
            </a>
            <ul className="p-2 bg-base-100">
              <li><Link to={`/register`}>Register</Link></li>
              <li><Link to={`/login`}>Login</Link></li>
            </ul>
          </li>
          <li><Link to={`/home`}>Logout</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar