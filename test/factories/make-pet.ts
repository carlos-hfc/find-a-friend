import { randomUUID } from "node:crypto"

import type { Prisma } from "@prisma/client"

export function makePet(
  override: Partial<Prisma.PetUncheckedCreateInput> = {},
) {
  return {
    id: override.id ?? randomUUID(),
    name: "Floquinho",
    about: "Floquinho é bem alegre e gosta de se divertir com a turma",
    age: 5,
    size: "medium",
    energy: "high",
    environment: "outdoor",
    requirements: "Ser uma boa companhia",
    organizationId: override.organizationId ?? randomUUID(),
    ...override,
  }
}
