import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await ticketsService.getTypes();
    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticket = await ticketsService.getTicketByUserId(userId);
    if (!ticket.id) {
      return res.status(httpStatus.NOT_FOUND).send({});
    }
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;
  try {
    if (!ticketTypeId) {
      res.sendStatus(400);
    }
    const ticket = await ticketsService.createTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if(error.name === "RequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
