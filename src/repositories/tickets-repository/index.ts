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

async function findTicketById(ticketId: number) {
  return await prisma.ticket.findFirst({
    where: { id: ticketId },
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

async function updateTicketStatus(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
    },
  });
}

const ticketsRepository = {
  findAllTypes,
  findTicket,
  createTicket,
  findTicketById,
  updateTicketStatus
};

export default ticketsRepository;
