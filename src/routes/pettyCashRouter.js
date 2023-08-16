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
  getUserReport,
} from "#controllers/pettyCashController";
import checkAuth from "#middleware/checkAuth";
import { checkAdmin, checkUser } from "#middleware/checkRole";

const pettyCashRouter = Router();
pettyCashRouter.use(checkAuth);

pettyCashRouter.post("/create-request", createRequest);
pettyCashRouter.get("/get-user-requests", getUserRequests);
pettyCashRouter.get("/get-requests", checkAdmin, getRequests);
pettyCashRouter.get("/get-request/:id", getRequest);
pettyCashRouter.put("/request/:id/approve", checkAdmin, approveRequest);
pettyCashRouter.put("/request/:id/reject", checkAdmin, rejectRequest);
pettyCashRouter.get("/stats", getStats);
pettyCashRouter.get("/user-stats", getUserStats);
pettyCashRouter.get("/report", getReport);
pettyCashRouter.get("/user-report", getUserReport);

export default pettyCashRouter;
