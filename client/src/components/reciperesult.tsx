interface Recipes {
    id: string,     //recipeID
    title: string,  //recipeName
    image: string,  //imageURL
    summary: string //mealtime
}

function reciperesult(props: {recipe: Recipes, user: any, setDetailClicked: Function}) {
        
    const addToMenu = async (meal: Recipes) => {
        const mealFetch = {
            userID: props.user._id,
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
                    'Authorization': `Bearer ${props.user.token}`
                }, 
                body: JSON.stringify(mealFetch)
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    const loadDetail = (id: string) => {
        props.setDetailClicked(() => id)
    }

  return (
    <div key={props.recipe.id} className="card card-compact bg-base-100 shadow-xl flex flex-row p-5">
                                <figure><img className="" src={props.recipe.image} alt="recipe image"/></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{props.recipe.title}</h2>
                                    <p>{props.recipe.summary}</p>
                                    <div className="card-actions justify-end">
                                        <button className="w-full btn btn-primary border-none bg-cyan-800" onClick={() => loadDetail(props.recipe.id)}>More Info</button>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button className="w-full btn btn-primary border-none bg-lime-800">Add to Menu</button>
                                    </div>
                                </div>
                            </div>
  )
}

export default reciperesult