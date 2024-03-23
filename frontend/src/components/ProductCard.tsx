import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { VoteModal } from "./VoteModal";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const ProductCard = ({product, index} : any) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState<any>({
        id : -1,
        username : "",
        name : ""
    });

    useEffect(() => {
        async function getUser(){
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/`, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("token")
                }
            });
            setUserProfile(response.data);
        }    

        getUser();
    }, []);

    // console.log(userProfile.username + product.user.username);
    const handleVote = () => {
        if(!localStorage.getItem("token")){
            alert("You need to login for vote.");
        }
        else{
            setShowModal(true);
            // navigate(`/vote/${product.id}`);
        }
    }

    if(!product){
        return <div>

        </div>
    }
    return <>
        <div className="mb-3">
            <div className="flex flex-row h-42 w-full max-w-5xl border border-gray-200 rounded-xl p-2 justify-between">
                <div className="flex flex-row items-center">
                    <div className="flex flex-row items-center w-96 mr-3">
                        <div className="w-10 flex-shrink-0 px-2 py-1 font-bold text-xl">
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
                    <div className="flex flex-col px-2 py-1 w-56 items-center justify-center mr-3">
                        <div className=" bg-orange-200 rounded-lg text-center m-2 w-fit px-2 py-1">
                            {product.typeOfProduct}
                        </div>
                        <div className="bg-green-200 rounded-lg text-center mb-2 w-fit px-2 py-1">
                            {product.typeCommercialOffer}
                        </div>
                        <div className="bg-white-200 border border-slate-200 shadow-sm rounded-lg text-center mb-2 w-fit px-2 py-1">
                            {product.tags[0]}
                        </div>
                    </div>
                    <div className="flex flex-col w-64 justify-center mr-3">
                        <dl className=" flex flex-row">
                            <dt className="text-sm font-medium text-gray-500 mr-2">Idea Rating</dt>
                            <dd className="flex items-center mb-3">
                                <div className=" w-24 bg-gray-200 rounded h-2.5 me-2">
                                    <div className="bg-blue-600 h-2.5 rounded" style={{width: `${(product.ideaRating/5.0)*100}%`}}></div>
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.ideaRating}/5</span>
                            </dd>
                        </dl>
                        <dl className="flex flex-row">
                            <dt className="text-sm font-medium text-gray-500 mr-2">Product Rating</dt>
                            <dd className="flex items-center mb-3">
                                <div className=" w-24 bg-gray-200 rounded h-2.5 me-2">
                                    <div className="bg-blue-600 h-2.5 rounded" style={{width: `${(product.productRating/5.0)*100}%`}}></div>
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.productRating}/5</span>
                            </dd>
                        </dl>
                        <dl className="flex flex-row">
                            <dt className="text-sm font-medium text-gray-500 mr-2">Number of Roast</dt>
                            <dd className="flex items-center mb-3">
                                <div className=" w-24 bg-gray-200 rounded h-2.5 me-2">
                                    <div className="bg-red-300 h-2.5 rounded" style={{width: `${Math.floor(product.numberRoasts/5.0)*100}%`}}></div>
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.numberRoasts}</span>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div className="flex flex-col px-2 py-1 items-center justify-center">
                    <div className="font-bold mb-2">
                        {product.numberVotes} Votes
                    </div>
                    <div>
                        {userProfile.username === product.user.username &&
                            <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Close menu</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>}
                        {userProfile && product && userProfile.username !== product.user.username && <button className=" bg-blue-500 rounded-md px-4 py-2 text-white" onClick={handleVote}>
                            Vote!
                        </button>}
                    </div>
                </div>
            </div>
        </div>
        {showModal && (
            <VoteModal product = {product} setShowModal={setShowModal}/>
        )}
    </>
}