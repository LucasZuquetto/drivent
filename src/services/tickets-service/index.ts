import ticketsRepository from "@/repositories/tickets-repository";
import userRepository from "@/repositories/user-repository";
import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getTypes() {
  return await ticketsRepository.findAllTypes();
}

async function getTicketByUserId(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  return await ticketsRepository.findTicket(enrollment.id);
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollmentId = (await enrollmentRepository.findWithAddressByUserId(userId)).id;
  const user = await userRepository.findById(userId);
  if (!user) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.createTicket(enrollmentId, ticketTypeId);
  return ticket;
}

const ticketsService = {
  getTypes,
  getTicketByUserId,
  createTicket,
};

export default ticketsService;
