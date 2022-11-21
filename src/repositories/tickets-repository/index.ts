import { prisma } from "@/config";

async function findAllTypes() {
  return await prisma.ticketType.findMany();
}

async function findTicket(userId: number) {
  return await prisma.ticket.findFirst({
    where: { enrollmentId: userId },
    include: {
      TicketType: true,
    },
  });
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      status: "RESERVED",
      ticketTypeId,
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketsRepository = {
  findAllTypes,
  findTicket,
  createTicket,
};

export default ticketsRepository;
