import { Hono } from 'hono'
import appRouterV1 from '../routes';
// Import the functions you need from the SDKs you need
const appRouter = new Hono<{
  Bindings : {
      DATABASE_URL : string,
      JWT_SECRET : string
  }
}>();

appRouter.route("/api/v1/", appRouterV1);
export default appRouter;
