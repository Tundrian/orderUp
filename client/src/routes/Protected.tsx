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
    <div className="mt-20 mx-10">
      <h1 className="text-center text-2xl">My Menu</h1>
      <div className="my-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
                    {sRecipes.length && sRecipes.map(x => 
                        (
                            <div key={x._id} className="card card-compact bg-base-100 shadow-xl flex flex-row p-5">
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