import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Recipe(id: string) {
    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.auth)
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState<[recipe] | []>
    let recipe: recipe

    interface recipe {
        id: string,
        title: string,
        image: string,
        imageType: string,
        servings: number,
        readyInMinutes: number,
        healthScore: number,
        dairyFree: boolean,
        instructions: string,
        vegan: boolean,
        dishTypes: string[],
        extendedIngredients: {
            id: string,
            name: string,
            original: string,
            unit: string,
            image: string,
        }[],
    }

    useEffect(() => {
       console.log(user)
        if(!user){
          navigate('/home')
        }
      }, [user, navigate, dispatch, ])
    
      const formSubmit = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/recipes/${id}/information?apiKey=${import.meta.env.VITE_API_KEY}`)
          const data = await api.json()
          console.log('data: ', data.results)
        //   setSRecipes(data.results)
      }

  return (
    <div>Recipe</div>
  )
}

export default Recipe