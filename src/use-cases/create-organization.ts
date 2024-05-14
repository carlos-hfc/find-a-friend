import type { Organization } from "@prisma/client"
import { hash } from "bcryptjs"

import type { OrganizationsRepository } from "@/repositories/organization-repository"

import { OrganizationAlreadyExists } from "./errors/organization-already-exists"

interface CreateOrganizationUseCaseRequest {
  name: string
  responsible: string
  email: string
  password: string
  cep: string
  address: string
  district: string
  complement: string | null
  city: string
  uf: string
  whatsapp: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private orgRepository: OrganizationsRepository) {}

  async execute({
    address,
    cep,
    city,
    district,
    email,
    name,
    password,
    responsible,
    uf,
    whatsapp,
    complement,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const orgExists = await this.orgRepository.findByEmail(email)

    if (orgExists) {
      throw new OrganizationAlreadyExists()
    }

    const passwordHash = await hash(password, 6)

    const organization = await this.orgRepository.create({
      address,
      cep,
      city,
      district,
      email,
      name,
      passwordHash,
      responsible,
      uf,
      whatsapp,
      complement: complement ?? null,
    })

    return { organization }
  }
}
