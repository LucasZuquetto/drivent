import ticketsRepository from "@/repositories/tickets-repository";
import userRepository from "@/repositories/user-repository";
import { notFoundError } from "@/errors";

async function getTypes() {
  return await ticketsRepository.findAllTypes();
}

async function getTicketByUserId(userId: number) {
  return await ticketsRepository.findTicket(userId);
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  const user = await userRepository.findById(enrollmentId);
  if (!user) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.createTicket(enrollmentId, ticketTypeId);
  return ticket;
}

const ticketsService = {
  getTypes,
  getTicketByUserId,
  createTicket
};

export default ticketsService;
