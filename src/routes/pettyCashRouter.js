import { Router } from "express";
import {
  createRequest,
  getRequests,
  getRequest,
} from "#controllers/pettyCashController";
import checkAuth from "#middleware/checkAuth";

const pettyCashRouter = Router();

pettyCashRouter.post("/create-request", checkAuth, createRequest);
pettyCashRouter.get("/get-requests", getRequests);
pettyCashRouter.get("/get-request/:id", getRequest);

export default pettyCashRouter;
