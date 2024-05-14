import type { Pet } from "@prisma/client"

import type { PetsRepository } from "@/repositories/pet-repository"

import { ResourceNotFound } from "./errors/resource-not-found"

interface GetPetUseCaseRequest {
  petId: string
}

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFound()
    }

    return { pet }
  }
}
