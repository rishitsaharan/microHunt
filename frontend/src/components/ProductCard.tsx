import { Link, useNavigate } from "react-router-dom"

export const ProductCard = ({product, index} : any) => {
    const navigate = useNavigate();

    const handleVote = () => {
        if(!localStorage.getItem("token")){
            alert("You need to signup for vote.");
        }
        else{
            navigate(`/vote/${product.id}`);
        }
    }

    return <div className="">
        <div className="mb-3 flex justify-center">
            <div className="flex flex-row h-40 w-full max-w-6xl border border-gray-200 rounded-xl p-4 justify-between">
                <div className="flex flex-row items-center">
                    <div className="flex flex-row items-center w-96 mr-3">
                        <div className="w-16 flex-shrink-0 px-2 py-1 font-bold text-xl">
                            #{index + 1}
                        </div>
                        <div>
                            <img src={product.logoFileUrl} className="w-16 h-16"/>
                        </div>
                        <div className="flex flex-col flex-grow-3 px-2 py-1">
                            <div className="text-lg font-bold cursor-pointer" onClick={() => navigate(`/${product.id}`)}>
                                {product.codeName}
                            </div>
                            <div className="text-sm text-gray-500">
                                {product.punchline}
                            </div>
                            <div>
                                <Link to={product.linkWebsite} className="text-blue-400 text-sm">Visit Website</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col px-2 py-1 w-64 items-center justify-center mr-3">
                        <div className=" bg-orange-200 rounded-lg text-center m-2 w-fit px-2 py-1">
                            {product.typeOfProduct}
                        </div>
                        <div className="bg-green-200 rounded-lg text-center mb-2 w-fit px-2 py-1">
                            {product.typeCommercialOffer}
                        </div>
                    </div>
                    <div className="flex flex-col w-64 justify-center mr-3">
                        <dl className=" flex flex-row">
                            <dt className="text-sm font-medium text-gray-500 mr-2">Idea Rating</dt>
                            <dd className="flex items-center mb-3">
                                <div className=" w-24 bg-gray-200 rounded h-2.5 me-2">
                                    <div className="bg-blue-600 h-2.5 rounded" style={{width: `${(product.ideaRating/5)*100}`}}></div>
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.ideaRating}</span>
                            </dd>
                        </dl>
                        <dl className="flex flex-row">
                            <dt className="text-sm font-medium text-gray-500 mr-2">Product Rating</dt>
                            <dd className="flex items-center mb-3">
                                <div className=" w-24 bg-gray-200 rounded h-2.5 me-2">
                                    <div className="bg-blue-600 h-2.5 rounded" style={{width: `${(product.productRating/5)*100}%`}}></div>
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.ideaRating}</span>
                            </dd>
                        </dl>
                        <dl className="flex flex-row">
                            <dt className="text-sm font-medium text-gray-500 mr-2">Roasts</dt>
                            <dd className="flex items-center mb-3">
                                <div className=" w-24 bg-gray-200 rounded h-2.5 me-2">
                                    <div className="bg-red-600 h-2.5 rounded" style={{width: `${(product.roastRating/5)*100}`}}></div>
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.roastRating}</span>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div className="flex flex-col px-2 py-1 items-center justify-center">
                    <div className="font-bold mb-2">
                        {product.numberVotes} Votes
                    </div>
                    <div>
                        <button className=" bg-blue-500 rounded-md px-4 py-2 text-white" onClick={handleVote}>
                            Vote!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}