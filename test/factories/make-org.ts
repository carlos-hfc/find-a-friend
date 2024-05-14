import { randomUUID } from "node:crypto"

import type { Prisma } from "@prisma/client"

type Override = Omit<Prisma.OrganizationCreateInput, "passwordHash"> & {
  password: string
}

export function makeOrg(override: Partial<Override> = {}) {
  return {
    id: override.id ?? randomUUID(),
    name: "Organização Pets",
    responsible: "John Doe",
    email: "org.pets@email.com",
    password: "123456",
    cep: "00000-000",
    address: "Rua A, 100",
    district: "Centro",
    complement: null,
    city: "São Paulo",
    uf: "SP",
    whatsapp: "+551199999-9999",
    ...override,
  }
}
