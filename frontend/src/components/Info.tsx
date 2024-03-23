import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProfileDP } from "./Header";
import { VoteModal } from "./VoteModal";

export const Info = ({productId} : {productId : string | undefined}) => {
    const [product, setProduct] = useState<any>();
    const [userProfile, setUserProfile] = useState<any>();
    const [showModal, setShowModal] = useState(false);

    const handleVote = () => {
        if(!localStorage.getItem("token")){
            alert("You need to login for vote.");
        }
        else{
            setShowModal(true);
        }
    }

    async function getProduct() {
        const response = await axios.get(`${BACKEND_URL}/api/v1/product/${productId}`, {
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token")
            }
        });
        setProduct(response.data);
    }
    async function getUser(){
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/`, {
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token")
            }
        });
        setUserProfile(response.data);
    }    

    useEffect(() => {
        getProduct();
        getUser();
    }, []);
    
    if(!product){
        return 
    }
    return <div className="flex flex-col items-center">
        <div className="max-w-5xl w-full border border-slate-300 rounded-lg m-20">
            <div className="flex flex-row justify-center mt-24">
                <ProductHeader product={product}/>
            </div>
            <div className="flex flex-row justify-center mb-10">
                {userProfile.username ===  product.user.username &&
                    <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>}
                {userProfile.username !== product.user.username && <button className=" bg-blue-500 rounded-md px-4 py-2 text-white" onClick={handleVote}>
                    Vote!
                </button>}
            </div>
            <div className="ml-32 mr-32">
                <div className="mb-7">
                    {product.description}
                </div>
                <div className="mb-7">
                    {product.moreInfo}
                </div>
                <div className="flex flex-row justify-center mb-7">
                    <AuthorAndRating product={product}/>
                </div>
                <UserFeedbacks product = {product}/>
            </div>
        </div>
        {showModal && (
            <VoteModal product = {product} setShowModal={setShowModal}/>
        )}
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
    )
}
function UserFeedbacks ({product} : {product : any}){
    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        async function getFeedbacks() {
            const response = await axios.get(`${BACKEND_URL}/api/v1/product/feedbacks/${product.id}`, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("token")
                }
            });

            setFeedbacks(response.data);
        }
        getFeedbacks();
    }, []);
    return(
        <div className="flex flex-col items-center m-10">
            {feedbacks && feedbacks.map((feedback : any) => {
                return (
                        <div className="flex flex-row items-center justify-start mb-1 w-full">
                            <div className="flex flex-row items-center mr-1">
                                <ProfileDP author={feedback.user.name} size="small"/>
                            </div>
                            {feedback.roasted && 
                                <div className=" mr-1 inline-flex items-center justify-center flex-shrink-0 w-5 h-5 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/>
                                    </svg>
                                    <span className="sr-only">Fire icon</span>
                                </div>}
                            <div className="text-sm flex flex-row items-center">
                                "{feedback.description}"
                            </div>
                        </div>
                )
            })}
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
                    <div className=" bg-orange-200 rounded-lg text-center m-2 w-fit px-2 py-1 shadow-sm">
                        {product.typeOfProduct}
                    </div>
                    <div className="bg-green-200 rounded-lg text-center mb-2 w-fit px-2 py-1 shadow-sm">
                        {product.typeCommercialOffer}
                    </div>
                    <div className="border border-slate-200 shadow-sm bg-white-200 rounded-lg text-center mb-2 w-fit px-2 py-1">
                        {product.tags[0]}
                    </div>
                </div>
            </div>
    )
}
