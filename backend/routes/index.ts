import { Hono } from "hono";
import appUser from "./user";
import appProduct from "./product";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { cors } from 'hono/cors'

const appRouterV1 = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    }
}>();

appRouterV1.use('/*', cors());
appRouterV1.route("/user/", appUser);
appRouterV1.route("/product/", appProduct);

appRouterV1.get("/", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const product = await prisma.product.findMany({});
        return c.json(product);
    }
    catch(err){
        c.status(404);
        return c.text("Error fetching Products.")
    }
});

export default appRouterV1;