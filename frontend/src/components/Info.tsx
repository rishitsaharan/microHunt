import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProfileDP } from "./Header";

export const Info = ({productId} : {productId : string | undefined}) => {
    const [product, setProduct] = useState<any>();

    function handleVote() {

    }
    async function getProduct() {
        const response = await axios.get(`${BACKEND_URL}/api/v1/product/${productId}`, {
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token")
            }
        });
        setProduct(response.data);
    }
    useEffect(() => {
        getProduct();
    }, []);
    
    if(!product){
        return 
    }
    return <div className="flex flex-col items-center">
        <div className="max-w-5xl w-full">
            <div className="flex flex-row justify-center">
                <ProductHeader product={product}/>
            </div>
            <div className="flex flex-row justify-center">
                <button className=" bg-blue-500 px-4 py-2 rounded-md text-white" onClick={handleVote}>Vote Now</button>
            </div>
            <div>
                <div className="p-10">
                    {product.description}
                </div>
                <div className="p-5">
                    {product.moreInfo}
                </div>
                <div className="flex flex-row justify-center">
                    <AuthorAndRating product={product}/>
                </div>
                <UserFeedbacks product = {product}/>
            </div>
        </div>
    </div>
}

function AuthorAndRating({product} : {product : any}){
    return (
        <div className="flex flex-row justify-around w-full">
            <div className="flex flex-row items-center">
                <ProfileDP author={product.user.name} size="small"/>
                <div className="font-bold text-xl">
                    Maker : {product.user.name}
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
    )
}
function UserFeedbacks ({product} : {product : any}){
    return(
        <div>

        </div>
    )
}
function ProductHeader ({product} : {product : any}) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-row items-center">
                <div className="flex flex-row items-center w-96 mr-3">
                    <div>
                        <img src={product.logoFileUrl} className="w-16 h-16"/>
                    </div>
                    <div className="flex flex-col px-2 py-1">
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
            </div>
    )
}
