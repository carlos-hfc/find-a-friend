import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository"

import { CreateOrganizationUseCase } from "../create-organization"

export function makeCreateOrganizationUseCase() {
  const orgRepository = new PrismaOrganizationRepository()
  const useCase = new CreateOrganizationUseCase(orgRepository)

  return useCase
}
