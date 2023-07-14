import { Router } from "express";
import { getBanks, resolveBank } from "#controllers/bankController";

const bankRouter = Router();

bankRouter.get("/get-banks", getBanks);
bankRouter.post("/resolve-bank", resolveBank);

export default bankRouter;
