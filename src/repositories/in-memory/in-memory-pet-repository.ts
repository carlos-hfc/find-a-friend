import { randomUUID } from "node:crypto"

import type { Pet, Prisma } from "@prisma/client"

import type { PetsRepository } from "../pet-repository"

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = []

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
