import type { Pet, Prisma } from "@prisma/client"

export interface PetsFilter {
  age?: number
  size?: string
  energy?: string
  environment?: string
  city: string
}

export abstract class PetsRepository {
  abstract list(params: PetsFilter): Promise<Pet[]>
  abstract findById(id: string): Promise<Pet | null>
  abstract create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
