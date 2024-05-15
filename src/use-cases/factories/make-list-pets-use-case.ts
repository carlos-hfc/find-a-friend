import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository"

import { ListPetsUseCase } from "../list-pets"

export function makeListPetsUseCase() {
  const petRepository = new PrismaPetRepository()
  const useCase = new ListPetsUseCase(petRepository)

  return useCase
}
