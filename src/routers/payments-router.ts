import { getPayment, postPayment } from "@/controllers/payments-controller";
import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { processPaymentSchema } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayment)
  .post("/process", validateBody(processPaymentSchema), postPayment);

export { paymentsRouter };
