import { Router } from "express";
import {
  createRequest,
  getRequests,
  getRequest,
  getUserRequests,
  approveRequest,
  rejectRequest,
  getStats,
  getUserStats,
  getReport,
} from "#controllers/pettyCashController";
import checkAuth from "#middleware/checkAuth";
import checkAdmin from "#middleware/checkAdmin";
const pettyCashRouter = Router();

pettyCashRouter.post("/create-request", checkAuth, createRequest);
pettyCashRouter.get("/get-user-requests", checkAuth, getUserRequests);
pettyCashRouter.get("/get-requests", checkAdmin, getRequests);
pettyCashRouter.get("/get-request/:id", getRequest);
pettyCashRouter.put("/request/:id/approve", checkAdmin, approveRequest);
pettyCashRouter.put("/request/:id/reject", checkAdmin, rejectRequest);
pettyCashRouter.get("/stats", getStats);
pettyCashRouter.get("/user-stats", checkAuth, getUserStats);
pettyCashRouter.get("/report", getReport);

export default pettyCashRouter;
