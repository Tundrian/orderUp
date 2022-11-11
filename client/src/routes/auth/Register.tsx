import React, {useState} from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
const {register, reset} = require('../../features/auth/authSlice')

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  )


  const [userForm, setuser] = useState<{userName: '', email: string, password: string, confirmPassword: string}>({
    userName: '',
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

    const fetched = await fetch(`http://localhost:5000/signup/`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {"Content-Type": "application/json"}
    })  
    const data = await fetched.json()
    console.log(data)
    if(!fetched.ok){
      setErr(true)
      return 
    }
    
    setErr(false)
    console.log('fetched: ', fetched)
    // localStorage.setItem('user', JSON.stringify(fetched.user))
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
        <input type="text" name="userName" id="userName" value={userForm.userName} onChange={handleChange} className="input w-full max-w-md"/>
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