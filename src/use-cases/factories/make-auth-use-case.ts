import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository"

import { AuthUseCase } from "../auth"

export function makeAuthUseCase() {
  const orgRepository = new PrismaOrganizationRepository()
  const useCase = new AuthUseCase(orgRepository)

  return useCase
}
