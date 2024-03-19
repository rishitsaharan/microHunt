import z, { string } from "zod";

export const signUpInput = z.object({
    username : z.string().email(),
    password : z.string().min(6),
    name : z.string().optional()
});
export type signUpInputType = z.infer<typeof signUpInput>;

export const signInInput = z.object({
    username : z.string().email(),
    password : z.string().min(6)
});
export type signInInputType = z.infer<typeof signInInput>;

export const voteInput = z.object({
    productId : z.number(),
    description : z.string(),
    roasted : z.string(),
    ideaRating : z.number().min(1).max(5),
    productRating : z.number().min(1).max(5),
    used : z.boolean()
})
export type voteInputType = z.infer<typeof voteInput>;

export const productInput = z.object({
    linkWebsite : z.string(),
    codeName : z.string(),
    punchline : z.string(),
    description : z.string(),
    moreInfo : z.string(),
    logoFileUrl : z.string(),
    typeOfProduct : z.string(),
    typeCommercialOffer : z.string(),
    tags : z.array(z.string()),
    launchDate : z.string(),
    productDevelopmentStage : z.string(),
    finalNotes : z.string()
})
export type productInputType = z.infer<typeof productInput>