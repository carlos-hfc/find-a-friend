import { compare } from "bcryptjs"
import { makeOrg } from "test/factories/make-org"
import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository"

import { CreateOrganizationUseCase } from "./create-organization"
import { OrganizationAlreadyExists } from "./errors/organization-already-exists"

let orgRepository: InMemoryOrganizationRepository
let useCase: CreateOrganizationUseCase

describe("Create Organization", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrganizationRepository()
    useCase = new CreateOrganizationUseCase(orgRepository)
  })

  it("should be able to create an organization", async () => {
    const { organization } = await useCase.execute(makeOrg())

    expect(organization.id).toEqual(expect.any(String))
    expect(orgRepository.items).toHaveLength(1)
  })

  it("should hash organization password upon registration", async () => {
    const { organization } = await useCase.execute(
      makeOrg({
        password: "123456",
      }),
    )

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      organization.passwordHash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it("should not be able to create an organization with same e-mail", async () => {
    const email = "org.pets@email.com"

    await useCase.execute(makeOrg({ email }))

    await expect(() => {
      return useCase.execute(makeOrg({ email }))
    }).rejects.toBeInstanceOf(OrganizationAlreadyExists)
  })
})
