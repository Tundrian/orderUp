import {useEffect, useState} from 'react'

interface DataFace {
    id: string,
    title: string,
    image: string,
}

// const data: DataFace[] = [
//     {
//         id: '1',
//         recipeID: '0001',
//         recipeName: 'test001',
//         imageURL: 'www.url.com',
//         mealtime: 'lunch'
//     }, {
//         id: '2',
//         recipeID: '0002',
//         recipeName: 'test002',
//         imageURL: 'www.url.com',
//         mealtime: 'lunch'
//     }, {
//         id: '3',
//         recipeID: '0003',
//         recipeName: 'test003',
//         imageURL: 'www.url.com',
//         mealtime: 'lunch'
//     },
//     {
//         id: '4',
//         recipeID: '0004',
//         recipeName: 'test004',
//         imageURL: 'www.url.com',
//         mealtime: 'lunch'
//     }, {
//         id: '5',
//         recipeID: '0005',
//         recipeName: 'test005',
//         imageURL: 'www.url.com',
//         mealtime: 'lunch'
//     }, {
//         id: '6',
//         recipeID: '0006',
//         recipeName: 'test006',
//         imageURL: 'www.url.com',
//         mealtime: 'lunch'
//     },
// ]

interface Recipe {
    id: string,
    title: string,
    image: string,
    summary: string
}

function Search() {

    // const [popular, setPopular] = useState<[any]>([''])
    const [search, setSearch] = useState<string>('')
    const [sRecipes, setSRecipes] = useState<[Recipe] | []>([])

    useEffect(() => {
        // getPopular()
    }, [])

    // const getPopular = async () => {

    //     const check: string= localStorage.getItem('popular') || ''
    
    //     if(check !== ''){
    //       setPopular(JSON.parse(check))
    //     }else{
    //       const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)
    //       const data = await api.json()
    //       localStorage.setItem('popular', JSON.stringify(data.recipes))
    //       console.log("recipes: ", data.recipes)
    //       setPopular(data.recipes)
    //     }
    
    //     console.log(popular)
    //   }

      const formSubmit = async (e:React.SyntheticEvent) => {
        e.preventDefault()
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${search}&number=9`)
          const data = await api.json()
          console.log('data: ', data.results)
          setSRecipes(data.results)
      }
    
      const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setSearch(e.target.value)
      }

    return (
        <>
            <div className="mt-20 mx-10">
                <form className="form-control" onSubmit={formSubmit}>
                    <input className="input input-bordered" value={search} onChange={handleSearchChange} type="text" placeholder="Search" />
                    <button className="rounded-md py-1 px-4 bg-lime-300 mx-5" type="submit">Search</button>
                </form>
                <div className="my-10 grid grid-cols-3 gap-10">
                    {/* {data.length && data.map(x =>  */}
                    {sRecipes.length && sRecipes.map(x => 
                        (
                            <div key={x.id} className="card card-compact w-96 bg-base-100 shadow-xl">
                                <figure><img src={x.image} alt="recipe image" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{x.title}</h2>
                                    <p>{x.summary}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Buy Now</button>
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