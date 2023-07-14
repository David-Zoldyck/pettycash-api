import { Router } from "express";
import {
  createRequest,
  getRequests,
  getRequest,
} from "#controllers/pettyCashController";

const pettyCashRouter = Router();

pettyCashRouter.post("/create-request", createRequest);
pettyCashRouter.get("/get-requests", getRequests);
pettyCashRouter.get("/get-request/:id", getRequest);

export default pettyCashRouter;
