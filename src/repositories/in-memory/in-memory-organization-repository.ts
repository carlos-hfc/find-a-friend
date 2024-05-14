import { randomUUID } from "node:crypto"

import type { Organization, Prisma } from "@prisma/client"

import type { OrganizationsRepository } from "../organization-repository"

export class InMemoryOrganizationRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async findById(id: string) {
    const organization = this.items.find(item => item.id === id)

    return organization ?? null
  }

  async findByEmail(email: string) {
    const organization = this.items.find(item => item.email === email)

    return organization ?? null
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      name: data.name,
      responsible: data.responsible,
      email: data.email,
      passwordHash: data.passwordHash,
      cep: data.cep,
      address: data.address,
      district: data.district,
      complement: data.complement ?? null,
      city: data.city,
      uf: data.uf,
      whatsapp: data.whatsapp,
    }

    this.items.push(organization)

    return organization
  }
}
