import type { Prisma } from "@prisma/client"

import { prisma } from "@/lib/prisma"

import type { OrganizationsRepository } from "../organization-repository"

export class PrismaOrganizationRepository implements OrganizationsRepository {
  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }
}
