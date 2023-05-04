import { Router } from "express";
import {
  getCommission,
  addCommission,
  updateCommission,
} from "../controllers/commission.controller";
const router = Router();

router.get("/", getCommission);
router.post("/", addCommission);
router.patch("/:_id", updateCommission);

export default router;
