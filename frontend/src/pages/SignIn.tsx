import { Auth } from "../components/Auth";

export const SignIn = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    return (
        <div className="">
            <div>
                <Auth type = "signin"/>
            </div>
        </div>
    );
};