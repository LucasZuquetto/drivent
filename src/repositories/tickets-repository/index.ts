import { prisma } from "@/config";

async function findAllTypes() {
  return await prisma.ticketType.findMany();
}

const ticketsRepository = {
  findAllTypes,
};

export default ticketsRepository;
