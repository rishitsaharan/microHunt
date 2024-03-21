import { Link, useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { isAuthenticatedState } from "../atoms/atom"

export const ProductCard = ({product, index} : any) => {
    const navigate = useNavigate();
    const isAuthenticated = useRecoilValue(isAuthenticatedState);

    const handleVote = () => {
        if(!isAuthenticated){
            alert("You need to signup for vote.");
        }
        else{
            console.log("logged in");
        }
    }

    return <div className="">
        <div className="mb-3 flex justify-center">
            <div className="flex flex-row h-40 w-full max-w-5xl border border-gray-200 rounded-lg p-4 justify-between items-center">
                <div className="w-16 flex-shrink-0 px-2 py-1">
                    #{index + 1}
                </div>
                <div className="flex flex-col flex-grow-3 px-2 py-1">
                    <div className="text-lg font-bold">
                        {product.codeName}
                    </div>
                    <div className="text-sm text-gray-500">
                        {product.punchline}
                    </div>
                    <div>
                        <Link to={product.linkWebsite} className="text-blue-500">Visit Website</Link>
                    </div>
                </div>
                <div className="flex flex-col flex-grow-2 px-2 py-1">
                    <div className=" bg-orange-200 rounded-lg text-center mb-2 w-fit px-2 py-1">
                        {product.typeOfProduct}
                    </div>
                    <div className="bg-green-200 rounded-lg text-center mb-2 w-fit px-2 py-1">
                        {product.typeCommercialOffer}
                    </div>
                </div>
                <div className="flex flex-col flex-grow-3 px-2 py-1">
                    <dl>
                        <dt className="text-sm font-medium text-gray-500">Idea Rating</dt>
                        <dd className="flex items-center mb-3">
                            <div className="w-full bg-gray-200 rounded h-2.5 me-2">
                                <div className="bg-blue-600 h-2.5 rounded" style={{width: `${(product.ideaRating/5)*100}`}}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.ideaRating}</span>
                        </dd>
                    </dl>
                    <dl>
                        <dt className="text-sm font-medium text-gray-500">Product Rating</dt>
                        <dd className="flex items-center mb-3">
                            <div className="w-full bg-gray-200 rounded h-2.5 me-2">
                                <div className="bg-blue-600 h-2.5 rounded" style={{width: `${(product.productRating/5)*100}`}}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.ideaRating}</span>
                        </dd>
                    </dl>
                    <dl>
                        <dt className="text-sm font-medium text-gray-500">Roasts</dt>
                        <dd className="flex items-center mb-3">
                            <div className="w-full bg-gray-200 rounded h-2.5 me-2">
                                <div className="bg-red-600 h-2.5 rounded" style={{width: `${(product.roastRating/5)*100}`}}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.roastRating}</span>
                        </dd>
                    </dl>
                </div>
                <div className="px-2 py-1 flex-grow-0">
                    <button className="text-blue-500" onClick={() => navigate(`/${product.id}`)}>...</button>
                </div>
                <div className="flex flex-col px-2 py-1 flex-grow-2">
                    <div className="font-bold mb-2">
                        {product.numberVotes} Votes
                    </div>
                    <div>
                        <button className=" bg-blue-400 rounded-md px-2 py-1 " onClick={handleVote}>
                            Vote!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}