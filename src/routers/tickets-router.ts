import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketsTypes, getUserTicket, postTicket } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getUserTicket)
  .post("/", postTicket);

export { ticketsRouter };
