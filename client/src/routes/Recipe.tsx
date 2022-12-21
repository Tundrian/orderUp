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

interface Props {
  id: string,
  closeRecipe: Function
}

function Recipe({id, closeRecipe}: Props) {
  // console.log('id: ', id)
    let cache = localStorage.getItem('testRecipe') || ''
    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.auth)
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState<RecipeDetail>()
    // const results = useMemo(() => getDetails(id), [recipe])
    

    async function getDetails(id: string) {
      console.log(id)
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
      }, [getDetails])

  return (
    <>
      {recipe && 
        <div className="z-50 p-5 h-auto mx-10 bg-zinc-900 mt-20 rounded-md relative">
          <button onClick={() => closeRecipe()} className="absolute top-0 right-0 mr-4 mt-3 text-white text-lg border py-1 px-2 rounded-sm">X</button>
          <div className="flex">
            <img className="w-1/2 rounded-md max-w-md" src={recipe.image} alt="" />
            <section className="px-5 w-1/2">
              <h2 className="text-3xl text-rose-800">{recipe.title}</h2>
              <div className="indent-3">
              <p><span>Servings: </span>{recipe.servings}</p>
              <p><span>Ready in </span>{recipe.readyInMinutes}<span> minutes</span></p>
              <p><span>Health Score: </span>{recipe.healthScore}</p>
              <p><span>Dairy Freen: </span>{recipe.dairyFree}</p>
              <p><span>Vegan: </span>{recipe.vegan}</p>
              <section className="">
                <ul className="list-none flex-row">Dish Types</ul>
                {recipe.dishTypes.map((dishType,i) => (
                  <li className="list-disc ml-10 text-slate-400" key={i}>{dishType}</li>
                ))}
              </section> 
              </div>
            </section>
          </div>
          
          <section className="my-5">
            <ul className="list-none text-3xl text-center">Ingredients</ul>
            {recipe.extendedIngredients && recipe.extendedIngredients.map((ingredient, i) => (
              <li  className="list-none indent-5 border-b border-b-slate-600" key={i}>
                  <h3 className="text-lg text-slate-200">{ingredient.name}</h3>
                  <p className="text-slate-500">{ingredient.original}<span> {ingredient.unit}</span></p>
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