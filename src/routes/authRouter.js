import { Router } from "express";
import { register, login, currentUser } from "#controllers/authController";
import checkAuth from "#middleware/checkAuth";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user", checkAuth, currentUser);

export default authRouter;
