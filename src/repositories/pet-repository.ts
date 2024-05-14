import type { Pet, Prisma } from "@prisma/client"

export abstract class PetsRepository {
  abstract create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
