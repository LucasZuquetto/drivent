import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import { CardData } from "@/protocols";

async function getPaymentById(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.enrollmentId !== userId) {
    throw unauthorizedError();
  }
  const payment = await paymentsRepository.findByTicketId(ticketId);
  return payment;
}

async function createPayment(ticketId: number, userId: number, cardData: CardData) {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  const cardLastDigits = String(cardData.number).slice(-4);
  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.enrollmentId !== userId) {
    throw unauthorizedError();
  }
  const processPaymentParams = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits,
  };
  const payment = await paymentsRepository.processPayment(processPaymentParams);
  await ticketsRepository.updateTicketStatus(ticketId);
  return payment;
}

const paymentsService = { getPaymentById, createPayment };

export default paymentsService;
