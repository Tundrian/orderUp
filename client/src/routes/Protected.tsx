import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'

function Protected() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state: any) => state.auth)


  useEffect(() => {
    console.log(user)
    if(!user){
      navigate('/home')
    }
  }, [user, navigate, dispatch, ])

  return (
    <div>Protected</div>
  )
}
export default Protected