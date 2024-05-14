import type { Pet } from "@prisma/client"

import type { OrganizationsRepository } from "@/repositories/organization-repository"
import type { PetsRepository } from "@/repositories/pet-repository"

import { ResourceNotFound } from "./errors/resource-not-found"

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: number
  size: string
  energy: string
  environment: string
  requirements: string
  organizationId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petRepository: PetsRepository,
    private orgRepository: OrganizationsRepository,
  ) {}

  async execute({
    about,
    age,
    energy,
    environment,
    name,
    organizationId,
    requirements,
    size,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const orgExists = await this.orgRepository.findById(organizationId)

    if (!orgExists) {
      throw new ResourceNotFound()
    }

    const pet = await this.petRepository.create({
      about,
      age,
      energy,
      environment,
      name,
      organizationId,
      requirements,
      size,
    })

    return { pet }
  }
}
