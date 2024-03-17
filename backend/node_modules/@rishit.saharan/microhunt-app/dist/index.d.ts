import z from "zod";
export declare const signUpInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    name?: string | undefined;
}, {
    username: string;
    password: string;
    name?: string | undefined;
}>;
export type signUpInputType = z.infer<typeof signUpInput>;
export declare const signInInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type signInInputType = z.infer<typeof signInInput>;
export declare const voteInput: z.ZodObject<{
    productId: z.ZodNumber;
    userId: z.ZodNumber;
    description: z.ZodString;
    roasted: z.ZodString;
    ideaRating: z.ZodNumber;
    productRating: z.ZodNumber;
    used: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    productId: number;
    userId: number;
    description: string;
    roasted: string;
    ideaRating: number;
    productRating: number;
    used: boolean;
}, {
    productId: number;
    userId: number;
    description: string;
    roasted: string;
    ideaRating: number;
    productRating: number;
    used: boolean;
}>;
export type voteInputType = z.infer<typeof voteInput>;
export declare const productInput: z.ZodObject<{
    userId: z.ZodNumber;
    linkWebsite: z.ZodString;
    codeName: z.ZodString;
    punchline: z.ZodString;
    description: z.ZodString;
    moreInfo: z.ZodString;
    logoFileUrl: z.ZodString;
    typeOfProduct: z.ZodString;
    productCategory: z.ZodString;
    typeCommercialOffer: z.ZodString;
    tags: z.ZodString;
    launchDate: z.ZodString;
    productDevelopmentStage: z.ZodString;
    finalNotes: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: number;
    description: string;
    linkWebsite: string;
    codeName: string;
    punchline: string;
    moreInfo: string;
    logoFileUrl: string;
    typeOfProduct: string;
    productCategory: string;
    typeCommercialOffer: string;
    tags: string;
    launchDate: string;
    productDevelopmentStage: string;
    finalNotes: string;
}, {
    userId: number;
    description: string;
    linkWebsite: string;
    codeName: string;
    punchline: string;
    moreInfo: string;
    logoFileUrl: string;
    typeOfProduct: string;
    productCategory: string;
    typeCommercialOffer: string;
    tags: string;
    launchDate: string;
    productDevelopmentStage: string;
    finalNotes: string;
}>;
export type productInputType = z.infer<typeof productInput>;
