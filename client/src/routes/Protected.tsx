import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'

interface Recipe {
  id: string,     //recipeID
  title: string,  //recipeName
  image: string,  //imageURL
  summary: string //mealtime
}

function Protected() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state: any) => state.auth)
  const [sRecipes, setSRecipes] = useState<[Recipe] | []>([])

  useEffect(() => {
    console.log(user)
    if(!user){
      navigate('/home')
    }
    loadRecipes()

  }, [user, navigate, dispatch, ])

  const loadRecipes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/recipe", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      })
      await console.log(response.json())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>Protected</div>
  )
}
export default Protected