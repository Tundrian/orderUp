import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'

interface Recipe {
  _id: string,     //recipeID
  recipeName: string,  //recipeName
  imageURL: string,  //imageURL
  summary: string //mealtime
}

function Protected() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state: any) => state.auth)
  const [sRecipes, setSRecipes] = useState<[Recipe] | []>([])

  useEffect(() => {
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
      let data = await response.json()
      setSRecipes(data)
      await console.log(sRecipes)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>My Menu</h1>
      <div className="my-10 grid grid-cols-3 gap-10">
                    {sRecipes.length && sRecipes.map(x => 
                        (
                            <div key={x._id} className="card card-compact w-96 bg-base-100 shadow-xl">
                                <figure><img src={x.imageURL} alt="recipe image" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{x.recipeName}</h2>
                                    <p>{x.summary}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary border-none bg-red-800" >Add to Menu</button>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
    </div>
  )
}
export default Protected