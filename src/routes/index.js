import { Router } from "express";
import authRouter from "#routes/authRouter";
import bankRouter from "#routes/bankRouter";
import pettyCashRouter from "#routes/pettyCashRouter";

const routes = Router();

routes.use(authRouter, bankRouter, pettyCashRouter);

export default routes;
