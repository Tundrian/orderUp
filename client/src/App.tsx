import './App.css'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import Root from './routes/root'
import ErrorPage from './routes/error-page'
import Home from './routes/Home'
import Register from './routes/auth/Register'
import Login from './routes/auth/Login'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      }
    ],
  },
])

function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
