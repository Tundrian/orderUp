import React, {useEffect, useState} from 'react'

interface DataFace {
    id: string,
    title: string,
    image: string,
}

interface Recipe {
    id: string,
    title: string,
    image: string,
    summary: string
}

function Search() {

    const [search, setSearch] = useState<string>('')
    const [sRecipes, setSRecipes] = useState<[Recipe] | []>([])

      const formSubmit = async (e:React.SyntheticEvent) => {
        e.preventDefault()
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&query=${search}&number=9`)
          const data = await api.json()
          console.log('data: ', data.results)
          setSRecipes(data.results)
      }
    
      const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setSearch(e.target.value)
      }

      const addToMenu = (meal: Recipe) => {
        console.log(meal)

      }

    return (
        <>
            <div className="mt-20 mx-10">
                <form className="form-control flex flex-row flex-nowrap sm:flex-wrap" onSubmit={formSubmit}>
                    <input className="input input-bordered w-[80%]" value={search} onChange={handleSearchChange} type="text" placeholder="Search" />
                    <button className="rounded-md py-2 px-4 bg-red-800 mx-2 w-[20%]" type="submit">Search</button>
                </form>
                <div className="my-10 grid grid-cols-3 gap-10">
                    {sRecipes.length && sRecipes.map(x => 
                        (
                            <div key={x.id} className="card card-compact w-96 bg-base-100 shadow-xl">
                                <figure><img src={x.image} alt="recipe image" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{x.title}</h2>
                                    <p>{x.summary}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary border-none bg-red-800" onClick={() => addToMenu(x)}>Add to Menu</button>
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