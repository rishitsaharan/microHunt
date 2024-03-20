import { Link } from "react-router-dom"

export const ProductCard = ({key, product, index} : any) => {
    return <div className="">
        <div className="mb-3 flex justify-center">
            <div className="flex flex-row h-40 w-full max-w-5xl border border-gray-200 rounded-lg p-4 items-center">
                <div className="w-16 flex-shrink-0 px-2 py-1">
                    #{index + 1}
                </div>
                <div className="flex flex-col flex-grow px-2 py-1">
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
                <div className="flex flex-col flex-grow px-2 py-1">
                    <div>
                        {product.typeOfProduct}
                    </div>
                    <div>
                        {product.typeCommercialOffer}
                    </div>
                </div>
                <div className="flex flex-col flex-grow px-2 py-1">
                    <div>
                        Idea Rating
                    </div>
                    <div>
                        Product Rating
                    </div>
                    <div>
                        Roasts
                    </div>
                </div>
                <div className="px-2 py-1">
                    <button className="text-blue-500">DropDown</button>
                </div>
                <div className="px-2 py-1">
                    Votes
                </div>
            </div>
        </div>
    </div>
}