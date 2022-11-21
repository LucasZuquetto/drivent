import ticketsRepository from "@/repositories/tickets-repository";

export async function getTypes() {
  return await ticketsRepository.findAllTypes();
}

const ticketsService = {
  getTypes
};

export default ticketsService;
