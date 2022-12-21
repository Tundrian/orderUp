import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Recipe from './Recipe'

interface DataFace {
    id: string,
    title: string,
    image: string,
}

interface Recipe {
    id: string,     //recipeID
    title: string,  //recipeName
    image: string,  //imageURL
    summary: string //mealtime
}

function Search() {

    const [search, setSearch] = useState<string>('')
    const [sRecipes, setSRecipes] = useState<[Recipe] | []>([])
    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.auth)
    const navigate = useNavigate()
    const [detailClicked, setDetailClicked] = useState<string>('')

    let cache = localStorage.getItem('testSearch') || ''

    useEffect(() => {
        // console.log(user)
        if(!user){
          navigate('/home')
        }
    }, [user, navigate, dispatch, ])

    const formSubmit = async (e:React.SyntheticEvent) => {
        e.preventDefault()
        if(cache !== ''){
            setSRecipes(JSON.parse(cache))
        }else{
            const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&query=${search}&number=9`)
            const data = await api.json()
            // console.log('data: ', data.results)
            localStorage.setItem('testSearch', JSON.stringify(data.results))
            setSRecipes(data.results)
        }
    }
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const addToMenu = async (meal: Recipe) => {
        console.log(user._id)
        const mealFetch = {
            userID: user._id,
            recipeID: meal.id,
            recipeName: meal.title,
            imageURL: meal.image,
            mealtime: meal.summary
        }
        try {
            const response = await fetch("http://localhost:5000/api/recipe", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(mealFetch)
            })
            await console.log(response.json())
        } catch (error) {
            console.log(error)
        }
    }

    const loadDetail = (id: string) => {
        setDetailClicked(() => id)
    }

    const closeRecipe = () => {
        setDetailClicked((prevVal) => prevVal = '')
    }

    return (
        <>
            {sRecipes.length !== 0 && detailClicked !== '' && <Recipe id={detailClicked} closeRecipe={closeRecipe} />}
            {/* <Recipe id={detailClicked} closeRecipe={closeRecipe}/> */}
            <div className="mt-20 mx-10">
                <form className="form-control flex flex-row flex-nowrap sm:flex-wrap w-full" onSubmit={formSubmit}>
                    <input className="input input-bordered min-w-[80%]" value={search} onChange={handleSearchChange} type="text" placeholder="Search" />
                    <button className="rounded-md py-2 px-4 bg-red-800 mx-2" type="submit">Search</button>
                </form>
                <div className="my-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
                    {sRecipes.length !== 0 && sRecipes.map(x => 
                        (
                            <div key={x.id} className="card card-compact bg-base-100 shadow-xl flex flex-row p-5">
                                <figure><img className="" src={x.image} alt="recipe image"/></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{x.title}</h2>
                                    <p>{x.summary}</p>
                                    <div className="card-actions justify-end">
                                        <button className="w-full btn btn-primary border-none bg-cyan-800" onClick={() => loadDetail(x.id)}>More Info</button>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button className="w-full btn btn-primary border-none bg-lime-800" onClick={() => addToMenu(x)}>Add to Menu</button>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    )
}

export default Search