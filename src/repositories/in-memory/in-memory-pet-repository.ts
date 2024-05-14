import { randomUUID } from "node:crypto"

import type { Pet, Prisma } from "@prisma/client"

import type { PetsFilter, PetsRepository } from "../pet-repository"
import type { InMemoryOrganizationRepository } from "./in-memory-organization-repository"

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgRepository: InMemoryOrganizationRepository) {}

  async list(params: PetsFilter) {
    const filteredOrgsByCity = this.orgRepository.items.filter(
      org => org.city.toLowerCase() === params.city.toLowerCase(),
    )

    const pets = this.items
      .filter(pet =>
        filteredOrgsByCity.some(org => org.id === pet.organizationId),
      )
      .filter(pet => (params.age ? params.age === pet.age : true))
      .filter(pet => (params.energy ? params.energy === pet.energy : true))
      .filter(pet =>
        params.environment ? params.environment === pet.environment : true,
      )
      .filter(pet => (params.size ? params.size === pet.size : true))

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy: data.energy,
      environment: data.environment,
      requirements: data.requirements,
      organizationId: data.organizationId,
    }

    this.items.push(pet)

    return pet
  }
}
