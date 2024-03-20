import { Hono } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { productInput, voteInput } from "@rishit.saharan/microhunt-app";
import { sign, verify } from "hono/jwt";
import { upgradeWebSocket } from 'hono/cloudflare-workers'

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


appProduct.get("/leaderboard", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const allProducts = await prisma.product.findMany();
    allProducts.sort((a, b) => b.numberVotes - a.numberVotes > 0 ? b.numberVotes : b.numberVotes == a.numberVotes ? 0 : -1);
    console.log(allProducts);
    return c.json(allProducts);
});

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
            }
        });
        return c.json(product);
    }
    else{
        c.status(404);
        return c.text("Product doesn't exists.")
    }
})

appProduct.get("/feedbacks", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const feedbacks = await prisma.feedback.findMany({
        where : {
            productId : body.productId
        }
    });

    c.status(200);
    return c.json(feedbacks);
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
    const feedback = await prisma.feedback.create({
        data : {
            productId : body.productId,
            userId : UserId,
            description : body.description,
            roasted : body.roasted,
            ideaRating : body.ideaRating,
            productRating : body.productRating,
            used : body.used
        }
    })
    await prisma.product.update({
        where : {
            id : body.productId
        },
        data : {
            numberVotes : {
                increment : 1
            }
        }
    });
    c.status(200);
    return c.json({
        "feedbackId" : feedback.id
    });
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