import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function processPayment(data: ProcessPaymentParams) {
  return prisma.payment.create({ data });
}

export type ProcessPaymentParams = Omit<Payment, "id" | "createdAt" | "updatedAt">;

const paymentsRepository = {
  findByTicketId,
  processPayment,
};

export default paymentsRepository;
