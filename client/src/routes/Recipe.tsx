import React, {useEffect, useState, useMemo} from 'react'
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
  // console.log('id: ', id)
    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.auth)
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState<RecipeDetail>()
    const results = useMemo(() => getDetails(id), [recipe])
    let cache = localStorage.getItem('testRecipe') || ''

    const getDetails = async (id: string) => {
      if(cache !== ''){
        setRecipe(JSON.parse(cache))
      }else{
        const api = await fetch(`https://api.spoonacular.com/recipes/${id.toString()}/information?apiKey=${import.meta.env.VITE_API_KEY}`)
        const data = await api.json()
        localStorage.setItem('testRecipe', JSON.stringify(data))
        setRecipe((id) => {
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
    }
    
    useEffect(() => {
      //  console.log(user)
        if(!user){
          navigate('/home')
        }
        getDetails(id)
      }, [user, navigate, dispatch, getDetails])

  return (
    <>
      {recipe && 
        <div className="z-50 w-screen h-auto m-5 bg-slate-800">
          <img className="w-1/2" src={recipe.image} alt="" />
          <h2>{recipe.title}</h2>
          <section>
            <p><span>Servings: </span>{recipe.servings}</p>
            <p><span>Ready in </span>{recipe.readyInMinutes}<span> minutes</span></p>
            <p><span>Health Score: </span>{recipe.healthScore}</p>
            <p><span>Dairy Freen: </span>{recipe.dairyFree}</p>
            <p><span>Vegan: </span>{recipe.vegan}</p>
          </section>
          <section>
            <ul>Dish Types</ul>
            {recipe.dishTypes.map((dishType,i) => (
              <li key={i}>{dishType}</li>
            ))}
          </section>  
          <section>
            <ul>Ingredients</ul>
            {recipe.extendedIngredients && recipe.extendedIngredients.map((ingredient, i) => (
              <li key={i}>
                  <h3>{ingredient.name}</h3>
                  <p>{ingredient.original}<span> {ingredient.unit}</span></p>
                  <img src={ingredient.image} alt="" />
              </li>
            ))}
          </section>
        </div>
      }    
    </>
  )
}

export default Recipe