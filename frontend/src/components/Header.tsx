import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import logo from "../assets/logo.png";
import axios from "axios";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userProfile, setUserProfile] = useState<{
        id : number,
        name : string,
        username : string
    }>({
        id : -1,
        name : "",
        username : ""
    });
    const navigate = useNavigate();

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

    const handleLogin = () => {
        setIsOpen(!open);
        navigate("/signin");
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userProfile");
        navigate("/")
        setIsOpen(!open);
    }

    return <div>
        <div className="flex justify-between p-4 border-b border-gray-200">
            <div className="flex flex-col-3 justify-center hover:cursor-pointer" onClick={() => navigate("/")}>
                <div className="max-w-10 max-h-10 mr-1">
                    <img src={logo} alt="MicroHunt"/>
                </div>
                <div className=" text-4xl font-extrabold text-blue-600">
                    Micro
                </div>
                <div className="text-4xl font-bold text-blue-950">
                    Launch
                </div>
            </div>
            <div className="flex flex-col-3 w-96">
                <button className="flex col-span-1 bg-blue-600 cursor-pointer rounded-md px-3 py-3 justify-center text-white max-w-30 max-h-20" onClick={() => navigate("/registerProd")}>
                    New Product
                </button>
                <div className="flex col-span-2">
                    <div className="flex items-center ml-20">
                        <button className="flex flex-col-1 items-center" onClick={() => setIsOpen(!isOpen)}>
                            <ProfileDP author={localStorage.getItem("token") ? userProfile.name : "A"} size="large"/>
                            <div className=" font-semibold">
                                {localStorage.getItem("token") ? userProfile.name : "Guest"}
                            </div>
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 mt-24 w-48 bg-white rounded-lg shadow-xl">
                                <button
                                    onClick={localStorage.getItem("token") ? handleLogout : handleLogin}
                                    className="block px-4 py-2 w-full text-gray-800 hover:bg-gray-200"
                                >
                                    {localStorage.getItem("token") ? `Logout` : `Login/Signup`}
                                </button>
                            </div>
                        )}
                    </div>
                    
                </div>
                
            </div>
        </div>
    </div>
};

export function ProfileDP({author, size} : {author : string | undefined, size:"small" | "large"}){
    return <div className={`mr-1 relative inline-flex items-center justify-center ${size == "small" ? `w-6 h-6` : `w-10 h-10`} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`${size == "small" ? `text-xs` : `text-md`} font-extralight text-gray-600 dark:text-gray-300`}>{author ? author[`0`].toUpperCase() : "A"}</span>
    </div>
}