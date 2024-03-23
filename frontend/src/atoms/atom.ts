import { atom } from "recoil";

export const isAuthenticatedState = atom({
    key : "isAuthenticatedState",
    default : false
});
export const userProfileState = atom({
    key : "userProfileState",
    default : null
});

export const voteCountState = atom({
    key : "voteCountState",
    default : 0
});