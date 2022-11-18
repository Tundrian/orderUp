import axios from 'axios'

const API_URL = '/api/auth/'

interface UserData {
  username: string,
  email: string,
  password: string,
  password2: string
}

// Register user
const register = async (userData: UserData) => {
  console.log(userData)
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData: UserData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService