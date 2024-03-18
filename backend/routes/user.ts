import { Hono } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { sign } from "hono/jwt";

const appUser = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    }
}>();

appUser.get("/", (c) => {
    return c.json({msg : "reached here"});
})


appUser.post("/signup", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try{
        const user = await prisma.user.create({
            data: {
              username: body.username,
              password: body.password,
              name: body.name
            }
          });
        const token = await sign({id : user.id}, c.env.JWT_SECRET);
        return c.json({
            message : "Signed Up",
            token : token,
            userData : {
                id : user.id,
                name : user.name,
                username : user.username
            }
        });
    }
    catch(err){
        c.status(411);
        return c.json({msg :"Error while signing up"});
    }
})
appUser.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const userExists = await prisma.user.findFirst({
        where : {
            username : body.username,
            password : body.password
        }
    });
    if(userExists){
        try{
            const jwtToken = await sign({id : userExists.id}, c.env.JWT_SECRET);
            c.status(200);
            return c.json({
                message : "Signed In",
                token : jwtToken,
                userData : {
                    id : userExists.id,
                    name : userExists.name,
                    username : userExists.username
                }
            });
        }
        catch(err){
            c.status(411);
            return c.text("Error while signing in. Please try again!");
        }
    }
    else{
        c.status(411);
        return c.text("User Doesn't Exist. Please Sign Up!");
    }
});
export default appUser;