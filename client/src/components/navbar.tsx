import { Link, useNavigate } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { logout, reset } from '../features/auth/authSlice'
function Navbar() {

  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: any) => state.auth)
  const navigate = useNavigate()

  const logoutCall = () => {
    dispatch(logout())
    dispatch(reset()) 
    navigate('/home')
  }

  return (
    <div className="fixed top-0 navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to={`/home`}>Order Up</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0 grid grid-cols-4 gap-1">
          <li><Link to={`/protected`}>Protected</Link></li>
          <li><Link to={`/search`}>Search</Link></li>
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
          <li className="p-2 bg-base-100 rounded hover:bg-gray-700 hover:cursor-pointer align-middle" onClick={() => logoutCall()}>Logout</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar