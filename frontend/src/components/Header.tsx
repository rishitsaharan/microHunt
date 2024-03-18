import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { userDisplayNameSelector } from "../atoms/selector";
import { isAuthenticatedState, userProfileState } from "../atoms/atom";
import logo from "../assets/logo.png";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState);
    const [userProfile, setUserProfile] = useRecoilState(userProfileState);
    const userDisplayName = useRecoilValue(userDisplayNameSelector);
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsOpen(!open);
        navigate("/signin");
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserProfile(null);
        navigate("/");
        setIsOpen(!open);
    }

    return <div>
        <div className="flex justify-between p-4 border-b border-gray-200">
            <div className="flex flex-col-3 justify-center">
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
                            <ProfileDP author={userDisplayName} size="large"/>
                            <div className=" font-semibold">
                                {userDisplayName}
                            </div>
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 mt-24 w-48 bg-white rounded-lg shadow-xl">
                                <button
                                    onClick={isAuthenticated ? handleLogout : handleLogin}
                                    className="block px-4 py-2 w-full text-gray-800 hover:bg-gray-200"
                                >
                                    {isAuthenticated ? `Logout` : `Login/Signup`}
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