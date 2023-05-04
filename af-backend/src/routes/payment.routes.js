import { Router } from "express";
import { makePayment, updatePayment } from "../controllers/payment.controller";
const router = Router();

router.post("/", makePayment);
router.patch("/:_id", updatePayment);

export default router;
