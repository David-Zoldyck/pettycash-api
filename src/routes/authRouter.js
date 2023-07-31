import { Router } from "express";
import {
  register,
  login,
  currentUser,
  forgotPassword,
  resetPassword,
} from "#controllers/authController";
import checkAuth from "#middleware/checkAuth";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user", checkAuth, currentUser);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);


export default authRouter;
