import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import { login } from '../../features/auth/authSlice'
import { useAppDispatch } from '../../../app/hooks'

function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  )

  const [userForm, setuser] = useState<{email: string, password: string}>({
    email: '',
    password: ''
  })
  const [err, setErr] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const val = e.target.value
    setuser(values => ({...values, [name]: val}))
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    dispatch(login(userForm))

    navigate('/home')
    
  }
  return (
    <div className="mt-10 flex flex-col justify-center p-10 ">
       <h1 className="label text-3xl text-center">Login</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
      <label className="label">
          <span className="label-text text-2xl">Email</span>
        </label>
        <input type="email" name="email" id="email" value={userForm.email} onChange={handleChange}  className="input w-full max-w-md"/>
        <label className="label">
          <span className="label-text text-2xl">Password</span>
        </label>
        <input type="password" name="password" id="password" value={userForm.password} onChange={handleChange} className="input w-full max-w-md"/>
        <button type="submit" className="btn mt-10 max-w-md">Login</button>
      </form>
    </div>
  )
}
export default Login