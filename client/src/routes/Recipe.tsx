import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
interface RecipeDetail {
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

interface Id {
  id: string
}
function Recipe({id}: Id) {
    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.auth)
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState<RecipeDetail>()

    const getDetails = async () => {
      const api = await fetch(`https://api.spoonacular.com/recipes/${id.toString()}/information?apiKey=${import.meta.env.VITE_API_KEY}`)
        const data = await api.json()

      setRecipe(() => {
        return {
          id: data.id,
          title: data.title,
          image: data.image,
          imageType: data.imageType,
          servings: data.servings,
          readyInMinutes: data.readyInMinutes,
          healthScore: data.healthScore,
          dairyFree: data.dairyFree,
          instructions: data.instructions,
          vegan: data.vegan,
          dishTypes: data.dishTypes,
          extendedIngredients: data.extendedIngredients
        }
      })
    }
    
    useEffect(() => {
      //  console.log(user)
        if(!user){
          navigate('/home')
        }
        getDetails()
      }, [user, navigate, dispatch, getDetails])
    /*
        full-screen layout
        close button at top right
        Show image in top left
        title in top right next to image
        section for details
          servings
          ready in minutes
          health score
          dairy free
          vegan
          dishTypes
        Secction for Ingredients
        Section for instructions, full width, under other sections 
    */
  return (
    <>

      {recipe && 
        <div className="z-50 w-screen h-screen m-5 bg-slate-800">
          <img src={recipe.image} alt="" />
          <h2>{recipe.title}</h2>
          <section>
            <p><span>Servings: </span>{recipe.servings}</p>
            <p><span>Ready in </span>{recipe.readyInMinutes}<span> minutes</span></p>
            <p><span>Health Score: </span>{recipe.healthScore}</p>
            <p><span>Dairy Freen: </span>{recipe.dairyFree}</p>
            <p><span>Vegan: </span>{recipe.vegan}</p>
          </section>
              <section>
                
                  <h3>Dish Types</h3>
                  {recipe.dishTypes.map(dishType => (
                    <div>
                      {dishType}
                    </div>
                  ))}

              </section>
            
          
        </div>
      }
    
    </>
  )
}

export default Recipe