
interface DataFace {
    id: string,
    recipeID: string,
    recipeName: string,
    imageURL: string,
    mealtime: string
}

const data: DataFace[] = [
    {
        id: '1',
        recipeID: '0001',
        recipeName: 'test001',
        imageURL: 'www.url.com',
        mealtime: 'lunch'
    }, {
        id: '2',
        recipeID: '0002',
        recipeName: 'test002',
        imageURL: 'www.url.com',
        mealtime: 'lunch'
    }, {
        id: '3',
        recipeID: '0003',
        recipeName: 'test002',
        imageURL: 'www.url.com',
        mealtime: 'lunch'
    },
]

function Search() {
    return (
        <>
        <div className="mt-20">
            <div className="form-control">
                <input type="text" placeholder="Search" className="input input-bordered" />
            </div>
            {data.length && data.map(x => 
                (
                    <div key={x.id} className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                )
            )}

        </div>
        </>
    )
}

export default Search