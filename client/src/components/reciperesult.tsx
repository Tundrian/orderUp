interface Recipe {
    id: string,     //recipeID
    title: string,  //recipeName
    image: string,  //imageURL
    summary: string //mealtime
}
function reciperesult(recipe: Recipe, user: any, setDetailClicked: Function) {
        

        const addToMenu = async (meal: Recipe) => {
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
        } catch (error) {
            console.log(error)
        }
    }
    const loadDetail = (id: string) => {
        setDetailClicked(() => id)
    }
  return (
    <div key={recipe.id} className="card card-compact bg-base-100 shadow-xl flex flex-row p-5">
                                <figure><img className="" src={recipe.image} alt="recipe image"/></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{recipe.title}</h2>
                                    <p>{recipe.summary}</p>
                                    <div className="card-actions justify-end">
                                        <button className="w-full btn btn-primary border-none bg-cyan-800" onClick={() => loadDetail(recipe.id)}>More Info</button>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button className="w-full btn btn-primary border-none bg-lime-800" onClick={() => addToMenu(recipe)}>Add to Menu</button>
                                    </div>
                                </div>
                            </div>
  )
}

export default reciperesult