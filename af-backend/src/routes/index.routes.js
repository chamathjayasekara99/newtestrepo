import express from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import productRouter from "./product.routes";
import orderRouter from "./order.routes";
import cartRouter from "./cart.routes";
import reviewRouter from "./review.routes";
import deliveryRouter from "./delivery.routes";
import paymentRouter from "./payment.routes";
import commissionRouter from "./commission.routes";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/reviews", reviewRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/cart", cartRouter);
router.use("/delivery", deliveryRouter);
router.use("/payment", paymentRouter);
router.use("/commission", commissionRouter);

export default router;
