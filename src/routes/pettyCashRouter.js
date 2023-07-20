import { Router } from "express";
import {
  createRequest,
  getRequests,
  getRequest,
  getUserRequests,
} from "#controllers/pettyCashController";
import checkAuth from "#middleware/checkAuth";
import checkAdmin from "#middleware/checkAdmin";
const pettyCashRouter = Router();

pettyCashRouter.post("/create-request", checkAuth, createRequest);
pettyCashRouter.get("/get-user-requests", checkAuth, getUserRequests);
pettyCashRouter.get("/get-requests", checkAdmin, getRequests);
pettyCashRouter.get("/get-request/:id", getRequest);

export default pettyCashRouter;
