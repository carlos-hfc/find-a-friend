import type { Prisma } from "@prisma/client"

import { prisma } from "@/lib/prisma"

import { type PetsFilter, PetsRepository } from "../pet-repository"

export class PrismaPetRepository implements PetsRepository {
  async list(params: PetsFilter) {
    const where: Prisma.PetWhereInput = {
      organization: {
        city: params.city,
      },
    }

    if (params.age) {
      Object.assign({ where, age: params.age })
    }

    if (params.energy) {
      Object.assign({ where, energy: params.energy })
    }

    if (params.environment) {
      Object.assign({ where, environment: params.environment })
    }

    if (params.size) {
      Object.assign({ where, size: params.size })
    }

    const pets = await prisma.pet.findMany({
      where,
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
