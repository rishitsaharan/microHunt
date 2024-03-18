import { selector } from "recoil";
import { isAuthenticatedState, userProfileState } from "./atom";

export const userDisplayNameSelector = selector({
    key : "userDisplayNameSelector",
    get : ({get}) => {
        const isAuthenticated = get(isAuthenticatedState);
        const userProfile : any = get(userProfileState);

        if(isAuthenticated && userProfile){
            return `${userProfile.name}`
        }
        return `Guest`;
    }
})