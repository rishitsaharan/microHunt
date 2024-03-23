import { Hono } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { productInput, voteInput } from "@rishit.saharan/microhunt-app";
import { sign, verify } from "hono/jwt";

const appProduct = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables: {
        Prisma : any,
        UserId : number
    }
}>();

appProduct.get("/leaderboard", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const allProducts = await prisma.product.findMany({
        include : {
            user : true,
            feedbacks : true
        }
    });
    const topGainers = allProducts.filter((product) => {
        const timePeriodInMilliseconds = 24 * 60 * 60 * 1000;
        const startTime = new Date(Date.now() - timePeriodInMilliseconds);
        const gainInVotes = product.numberVotes - product.feedbacks.filter(feedback => feedback.createdAt > startTime).length;
        return gainInVotes >= 0;
    })
    topGainers.sort((a, b) => b.numberVotes - a.numberVotes > 0 ? b.numberVotes : b.numberVotes == a.numberVotes ? 0 : -1);
    allProducts.sort((a, b) => b.numberVotes - a.numberVotes > 0 ? b.numberVotes : b.numberVotes == a.numberVotes ? 0 : -1);
    return c.json({
        topGainers : topGainers,
        allTimeGainers : allProducts
    });
});

appProduct.use("*", async (c, next) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
    c.set("Prisma", prisma);
    const jwtToken = c.req.header("Authorization");
    if(!jwtToken){
        c.status(411);
        return c.text("No Auth Token");
    }
    try{
        const token = jwtToken.split(" ")[1];
        const payload = await verify(token, c.env.JWT_SECRET);
        if(!payload){
            c.status(411);
            return c.text("Incorrect Auth Token");
        }
        c.set("UserId", payload.id);
    }catch(err){
        c.status(411);
        return c.text("No Auth Token");
    }
    await next();
});

//get req

appProduct.get("/feedbacks/:id", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const params = c.req.param().id;
    if(params){
        const productId = parseInt(params);
        const feedbacks = await prisma.feedback.findMany({
            where : {
                productId : productId
            },
            include : {
                user : true
            }
        });

        c.status(200);
        return c.json(feedbacks);
    }
    else{
        c.status(404);
        return c.text("Product doesn't exists.")
    }
})

appProduct.get("/:id", async (c) => {
    const params = c.req.param().id;
    if(params){
        const productId = parseInt(params);
        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const product = await prisma.product.findFirst({
            where : {
                id : productId
            },
            include :{
                user : true,
                feedbacks: {
                    include : {
                        user : true
                    }
                }
            }
        });
        return c.json(product);
    }
    else{
        c.status(404);
        return c.text("Product doesn't exists.")
    }
})

//post req


appProduct.post("/vote", async(c) => {
    const body = await c.req.json();
    const UserId = c.get("UserId");
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const {success} = voteInput.safeParse(body);
    if(!success){
        c.status(403);
        return c.text("Incorrect Input Formats");
    }
    await prisma.$transaction(async (prisma) => {
        const feedback = await prisma.feedback.create({
            data: {
                productId: body.productId,
                userId: UserId,
                description: body.description,
                roasted: body.roasted,
                ideaRating: body.ideaRating,
                productRating: body.productRating
            }
        });
        await prisma.product.update({
            where: {
                id: body.productId
            },
            data: {
                numberVotes: {
                    increment: 1
                }
            }
        });
        const allFeedbacks = await prisma.feedback.findMany({
            where: {
                productId: body.productId
            }
        });
        const totalIdeaRating = allFeedbacks.reduce((acc, curr) => acc + curr.ideaRating, 0);
        const averageIdeaRating = totalIdeaRating*1.0 / allFeedbacks.length;

        const totalProductRating = allFeedbacks.reduce((acc, curr) => acc + curr.productRating, 0);
        const averageProductRating = totalProductRating *1.0 / allFeedbacks.length;

        const feedbacks = await prisma.feedback.findMany({
            where : {
                id : body.productId,
                roasted : false
            }
        });
        const roasts = await prisma.feedback.findMany({
            where : {
                id : body.productId,
                roasted : true
            }
        });
        console.log(roasts);
        await prisma.product.update({
            where: {
                id: body.productId
            },
            data: {
                ideaRating : averageIdeaRating,
                productRating: averageProductRating,
                numberFeedback : feedbacks.length,
                numberRoasts : roasts.length
            }
        });

        c.status(200);
        c.json({
            "feedbackId" : feedback.id
        });
    });
    return c.text("");
});


appProduct.post("/", async (c) => {
    const body = await c.req.json();
    const UserId = c.get("UserId");
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const {success} = productInput.safeParse(body);
    if(!success){
        c.status(403);
        return c.text("Incorrect Input Formats");
    }

    const product = await prisma.product.create({
        data : {
            userId : UserId,
            linkWebsite : body.linkWebsite,
            codeName : body.codeName,
            punchline : body.punchline,
            description : body.description,
            moreInfo : body.moreInfo,
            logoFileUrl : body.logoFileUrl,
            typeOfProduct : body.typeOfProduct,
            typeCommercialOffer : body.typeCommercialOffer,
            tags : body.tags,
            launchDate : body.launchDate,
            productDevelopmentStage : body.productDevelopmentStage,
            finalNotes : body.finalNotes
        }
    });
    
    return c.json({
        "productId" : product.id
    });

});
export default appProduct;