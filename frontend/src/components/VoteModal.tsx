import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { voteInputType } from "@rishit.saharan/microhunt-app";
import { useRecoilState } from "recoil";
import { voteCountState } from "../atoms/atom";


export const VoteModal = ({product, setShowModal} : any) => {
    const [roastMode, setRoastMode] = useState(false);
    const [ideaRating, setIdeaRating] = useState(0);
    const [productRating, setProductRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [voteCount, setVoteCount] = useRecoilState(voteCountState);

    async function handleVote() {
        const requestBody : voteInputType= {
            productId : product.id,
            description : feedback,
            roasted : roastMode,
            ideaRating : ideaRating,
            productRating : productRating
        };
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/product/vote`, requestBody, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("token")
                }
            });
            console.log(response.data.feedbackId);
            setVoteCount(voteCount + 1);
            setShowModal(false);
        }
        catch(err){
            alert("Error while giving feedback. Please try again.")
        }
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
            {/* Modal backdrop */}
                <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
                
                {/* Modal content */}
                <div className="fixed bg-white p-6 rounded-lg shadow-xl max-w-xl w-full h-3/5 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 flex flex-col justify-between">
                    <span className="absolute top-0 right-0 cursor-pointer p-2" onClick={() => setShowModal(false)}>
                        &times;
                    </span>
                    {/* Header with logo and visit Website */}
                    <div className="flex flex-row items-center justify-center mb-7">
                        <div className="mr-2">
                            <img src={product.logoFileUrl} className="w-16 h-16 rounded-lg"/>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-lg font-bold">
                                {product.codeName}
                            </div>
                            <div>
                                <Link to={product.linkWebsite} className="text-blue-400 text-sm">Visit Website</Link>
                            </div>
                        </div>
                    </div>
                    {/* Roast Mode */}
                    <div className="flex flex-row border border-slate-300 rounded-lg px-4 py-2 items-center justify-between mb-7">
                        <div>
                            <div className="font-semibold text-md">
                                Roast Mode
                            </div>
                            <div className="text-sm">
                                Enable this to inform us you're roasting the product
                            </div>
                        </div>
                        <label className="">
                            <input type="checkbox" value="" className="sr-only peer"  onChange={() => setRoastMode(!roastMode)} checked={roastMode}/>
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <div className="flex flex-col mb-5">
                        <div className="font-semibold text-md mb-2">
                            How would you score
                        </div>
                        <div className="">
                            <div className="flex flex-row justify-between mb-2">
                                <RatingSection text="The Idea" rating={ideaRating} setRating={setIdeaRating}/>
                            </div>
                            <div className="flex flex-row justify-between">
                                <RatingSection text="The Product" rating={productRating} setRating={setProductRating}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mb-5">
                        <div className="text-md font-semibold">
                            {roastMode ? `Your Roast` : `Your Feedback`}
                        </div>
                        <textarea rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={roastMode ? `Your Roasting Feedback, please be gentle` : `Your feedback about the product`}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>

                    </div>
                    <div className="flex justify-end">
                        <button className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 mr-2 hover:bg-gray-400" onClick={() => setShowModal(false)}>Cancel</button>
                        <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600" onClick={handleVote}>Confirm Vote</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function RatingSection({ text, rating, setRating }: any) {
    const handleRatingChange = (event: any) => {
        setRating(parseInt(event.target.value));
    }
    return (
        <>
            <div>
                {text}
            </div>
            <div className="flex flex-row-reverse justify-end items-center">
                {[5, 4, 3, 2, 1].map((value) => (
                    <React.Fragment key={value}>
                        <input
                            id={`hs-ratings-readonly-${value}`}
                            type="radio"
                            className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                            name={`hs-ratings-readonly-${text}`}
                            value={value} // Set value to the specific rating value
                            onChange={handleRatingChange}
                            checked={rating === value} // Check if this rating is selected
                        />
                        <label
                            htmlFor={`hs-ratings-readonly-${value}`}
                            className={`peer-checked:text-blue-400 text-gray-300 pointer-events-none dark:peer-checked:text-blue-600 dark:text-gray-600`}
                        >
                            <svg
                                className="flex-shrink-0 size-5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                        </label>
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}