import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import { register } from '../../features/auth/authSlice'
import { useAppDispatch } from '../../../app/hooks'

function Register() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  )


  const [userForm, setuser] = useState<{username: '', email: string, password: string, confirmPassword: string}>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [err, setErr] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const val = e.target.value
    setuser(values => ({...values, [name]: val}))
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    dispatch(register(userForm))

    navigate('/home')
    
  }
  

  return (
    <div className="mt-10 flex flex-col justify-center p-10 ">
      <h1 className="label text-3xl text-center">Register</h1>
      
      <form className="flex flex-col" onSubmit={handleSubmit}>
      {err && (
        <p className="text-red-500 border border-red-500 text-xl">Invalid form entry. Please try again.</p>
      )}
        <label className="label">
          <span className="label-text text-2xl">Email</span>
        </label>
        <input type="email" name="email" id="email" value={userForm.email} onChange={handleChange} className="input w-full max-w-md"/>
        <label className="label">
          <span className="label-text text-2xl">Username</span>
        </label>
        <input type="text" name="username" id="username" value={userForm.username} onChange={handleChange} className="input w-full max-w-md"/>
        <label className="label">
          <span className="label-text text-2xl">Password</span>
        </label>
        <input type="password" name="password" id="password" value={userForm.password} onChange={handleChange}  className="input w-full max-w-md"/>
        <label className="label">
          <span className="label-text text-2xl">Confirm Password</span>
        </label>
        <input type="password" name="confirmPassword" id="confirmPassword" value={userForm.confirmPassword} onChange={handleChange} className="input w-full max-w-md"/>
        <button type="submit" className="btn mt-10 max-w-md">Register</button>
      </form>
    </div>
  )
}
export default Register