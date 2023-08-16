import { Router } from "express";
import authRouter from "#routes/authRouter";
import bankRouter from "#routes/bankRouter";
import pettyCashRouter from "#routes/pettyCashRouter";

const routes = Router();
routes.get("/", (req, res) => {
  return res.json({
    message: "Welcome to YB crip - api",
  });
});

routes.use(authRouter, bankRouter, pettyCashRouter);

export default routes;
