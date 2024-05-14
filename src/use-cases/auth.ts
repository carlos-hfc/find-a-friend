import type { Organization } from "@prisma/client"
import { compare } from "bcryptjs"

import type { OrganizationsRepository } from "@/repositories/organization-repository"

import { InvalidCredentials } from "./errors/invalid-credentials"

interface AuthUseCaseRequest {
  email: string
  password: string
}

interface AuthUseCaseResponse {
  organization: Organization
}

export class AuthUseCase {
  constructor(private orgRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {
    const organization = await this.orgRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentials()
    }

    const passwordMatches = await compare(password, organization.passwordHash)

    if (!passwordMatches) {
      throw new InvalidCredentials()
    }

    return { organization }
  }
}
