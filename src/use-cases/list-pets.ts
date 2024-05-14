import type { Pet } from "@prisma/client"

import type { PetsRepository } from "@/repositories/pet-repository"

interface ListPetsUseCaseRequest {
  age?: number
  size?: string
  energy?: string
  environment?: string
  city: string
}

interface ListPetsUseCaseResponse {
  pets: Pet[]
}

export class ListPetsUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energy,
    environment,
    size,
  }: ListPetsUseCaseRequest): Promise<ListPetsUseCaseResponse> {
    const pets = await this.petRepository.list({
      city,
      age,
      energy,
      environment,
      size,
    })

    return { pets }
  }
}
