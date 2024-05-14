import { makeOrg } from "test/factories/make-org"
import { makePet } from "test/factories/make-pet"
import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository"
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository"

import { CreatePetUseCase } from "./create-pet"
import { ResourceNotFound } from "./errors/resource-not-found"

let petRepository: InMemoryPetRepository
let orgRepository: InMemoryOrganizationRepository
let useCase: CreatePetUseCase

describe("Create Pet", () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrganizationRepository()
    useCase = new CreatePetUseCase(petRepository, orgRepository)
  })

  it("should be able to register a pet", async () => {
    const organization = await orgRepository.create({
      ...makeOrg({ email: "org.pets@email.com" }),
      passwordHash: "123456",
    })

    const { pet } = await useCase.execute(
      makePet({ organizationId: organization.id }),
    )

    expect(pet.id).toEqual(expect.any(String))
    expect(petRepository.items).toHaveLength(1)
  })

  it("should not be able to register a pet with inexistent organization", async () => {
    await expect(() => {
      return useCase.execute(makePet())
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
