import { Router } from "express";
import {
  createRequest,
  getRequests,
  getRequest,
  getUserRequests,
  getSuperAdminRequests,
  approveRequest,
  approveRequestFinal,
  rejectRequest,
  rejectRequestFinal,
  getStats,
  getUserStats,
  getPendingRequests,
  getPendingRequestsUser,
  getPendingRequestsSuperAdmin,
  getApprovedRequests,
  getReport,
  getAllReport,
  getUserReport,
  getAllUserReport,
  getAuthorizers,
} from "#controllers/pettyCashController";
import checkAuth from "#middleware/checkAuth";
import { checkAdmin, checkUser, checkSuperAdmin } from "#middleware/checkRole";
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
pettyCashRouter.get(
  "/get-superadmin-requests",
  checkSuperAdmin,
  getSuperAdminRequests
);
pettyCashRouter.get("/get-pending-requests-user", getPendingRequestsUser);
pettyCashRouter.get("/get-pending-requests", checkAdmin, getPendingRequests);
pettyCashRouter.get(
  "/get-pending-requests-superadmin",
  checkSuperAdmin,
  getPendingRequestsSuperAdmin
);
pettyCashRouter.get("/get-approved-requests", getApprovedRequests);
pettyCashRouter.get("/get-request/:id", getRequest);
pettyCashRouter.put("/request/:id/approve", checkAdmin, approveRequest);
pettyCashRouter.put("/request/:id/reject", checkAdmin, rejectRequest);
pettyCashRouter.put(
  "/request/:id/approve-final",
  checkSuperAdmin,
  approveRequestFinal
);
pettyCashRouter.put(
  "/request/:id/reject-final",
  checkSuperAdmin,
  rejectRequestFinal
);
pettyCashRouter.get("/stats", getStats);
pettyCashRouter.get("/user-stats", getUserStats);
pettyCashRouter.get("/report/:status", getReport);
pettyCashRouter.get("/report-all", getAllReport);
pettyCashRouter.get("/user-report/:status", getUserReport);
pettyCashRouter.get("/user-report-all", getAllUserReport);
pettyCashRouter.get("/get-authorizers", getAuthorizers);

export default pettyCashRouter;
