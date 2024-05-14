import { makeOrg } from "test/factories/make-org"
import { makePet } from "test/factories/make-pet"
import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository"
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository"

import { ResourceNotFound } from "./errors/resource-not-found"
import { GetPetUseCase } from "./get-pet"

let orgRepository: InMemoryOrganizationRepository
let petRepository: InMemoryPetRepository
let useCase: GetPetUseCase

describe("Get Pet", () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrganizationRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    useCase = new GetPetUseCase(petRepository)

    const organization = await orgRepository.create({
      ...makeOrg({ email: "org.pets.sp@email.com" }),
      passwordHash: "123456",
    })

    await petRepository.create(
      makePet({ organizationId: organization.id, id: "pet-id" }),
    )
  })

  it("should be able to find a pet by id", async () => {
    const { pet } = await useCase.execute({ petId: "pet-id" })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet).toEqual(
      expect.objectContaining({
        id: "pet-id",
      }),
    )
  })

  it("should not be able to find a pet by wrong id", async () => {
    await expect(() => {
      return useCase.execute({ petId: "123" })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
