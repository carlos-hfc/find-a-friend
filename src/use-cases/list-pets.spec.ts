import { makeOrg } from "test/factories/make-org"
import { makePet } from "test/factories/make-pet"
import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository"
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository"

import { ListPetsUseCase } from "./list-pets"

let orgRepository: InMemoryOrganizationRepository
let petRepository: InMemoryPetRepository
let useCase: ListPetsUseCase

describe("List Pets", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrganizationRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    useCase = new ListPetsUseCase(petRepository)
  })

  it("should be able to list pets, filtering by city", async () => {
    const organization = await orgRepository.create({
      ...makeOrg({ email: "org.pets.sp@email.com" }),
      passwordHash: "123456",
    })

    await petRepository.create(makePet({ organizationId: organization.id }))
    await petRepository.create(makePet({ organizationId: organization.id }))

    const { pets } = await useCase.execute({ city: organization.city })

    expect(pets).toHaveLength(2)
  })

  it("should be able to list pets, filtering by city and size", async () => {
    const organization = await orgRepository.create({
      ...makeOrg({ email: "org.pets.sp@email.com" }),
      passwordHash: "123456",
    })

    await petRepository.create(
      makePet({ organizationId: organization.id, size: "medium" }),
    )
    await petRepository.create(
      makePet({ organizationId: organization.id, size: "medium" }),
    )
    await petRepository.create(
      makePet({ organizationId: organization.id, size: "large" }),
    )

    const { pets } = await useCase.execute({
      city: organization.city,
      size: "medium",
    })

    expect(pets).toHaveLength(2)
  })

  it("should be able to list pets, filtering by city and age", async () => {
    const organization = await orgRepository.create({
      ...makeOrg({ email: "org.pets.sp@email.com" }),
      passwordHash: "123456",
    })

    await petRepository.create(
      makePet({ organizationId: organization.id, age: 2 }),
    )
    await petRepository.create(
      makePet({ organizationId: organization.id, age: 2 }),
    )
    await petRepository.create(
      makePet({ organizationId: organization.id, age: 5 }),
    )

    const { pets } = await useCase.execute({
      city: organization.city,
      age: 2,
    })

    expect(pets).toHaveLength(2)
  })

  it("should be able to list pets, filtering by city and energy", async () => {
    const organization = await orgRepository.create({
      ...makeOrg({ email: "org.pets.sp@email.com" }),
      passwordHash: "123456",
    })

    await petRepository.create(
      makePet({ organizationId: organization.id, energy: "high" }),
    )
    await petRepository.create(
      makePet({ organizationId: organization.id, energy: "high" }),
    )
    await petRepository.create(
      makePet({ organizationId: organization.id, energy: "low" }),
    )

    const { pets } = await useCase.execute({
      city: organization.city,
      energy: "high",
    })

    expect(pets).toHaveLength(2)
  })

  it("should be able to list pets, filtering by city and energy", async () => {
    const organization = await orgRepository.create({
      ...makeOrg({ email: "org.pets.sp@email.com" }),
      passwordHash: "123456",
    })

    await petRepository.create(
      makePet({ organizationId: organization.id, environment: "outdoor" }),
    )
    await petRepository.create(
      makePet({ organizationId: organization.id, environment: "outdoor" }),
    )
    await petRepository.create(
      makePet({ organizationId: organization.id, environment: "outdoor" }),
    )

    const { pets } = await useCase.execute({
      city: organization.city,
      environment: "outdoor",
    })

    expect(pets).toHaveLength(3)
  })
})
