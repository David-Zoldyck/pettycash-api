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
  getPendingRequests,
  getPendingRequestsUser,
  getReport,
  getAllReport,
  getUserReport,
  getAllUserReport,
} from "#controllers/pettyCashController";
import checkAuth from "#middleware/checkAuth";
import { checkAdmin, checkUser } from "#middleware/checkRole";
import uploader from "#middleware/multer";

const pettyCashRouter = Router();
pettyCashRouter.use(checkAuth);

pettyCashRouter.post(
  "/create-request",
  uploader.single("attachment"),
  createRequest
);
pettyCashRouter.get("/get-user-requests", getUserRequests);
pettyCashRouter.get("/get-requests", checkAdmin, getRequests);
pettyCashRouter.get("/get-pending-requests-user", getPendingRequestsUser);
pettyCashRouter.get("/get-pending-requests", checkAdmin, getPendingRequests);
pettyCashRouter.get("/get-request/:id", getRequest);
pettyCashRouter.put("/request/:id/approve", checkAdmin, approveRequest);
pettyCashRouter.put("/request/:id/reject", checkAdmin, rejectRequest);
pettyCashRouter.get("/stats", getStats);
pettyCashRouter.get("/user-stats", getUserStats);
pettyCashRouter.get("/report/:status", getReport);
pettyCashRouter.get("/report-all", getAllReport);
pettyCashRouter.get("/user-report/:status", getUserReport);
pettyCashRouter.get("/user-report-all", getAllUserReport);

export default pettyCashRouter;
