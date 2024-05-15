import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository"
import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository"

import { CreatePetUseCase } from "../create-pet"

export function makeCreatePetUseCase() {
  const orgRepository = new PrismaOrganizationRepository()
  const petRepository = new PrismaPetRepository()
  const useCase = new CreatePetUseCase(petRepository, orgRepository)

  return useCase
}
