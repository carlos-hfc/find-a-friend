import { hash } from "bcryptjs"
import { makeOrg } from "test/factories/make-org"
import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository"

import { AuthUseCase } from "./auth"
import { InvalidCredentials } from "./errors/invalid-credentials"

let orgRepository: InMemoryOrganizationRepository
let useCase: AuthUseCase

describe("Auth Organization", () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrganizationRepository()
    useCase = new AuthUseCase(orgRepository)

    await orgRepository.create({
      ...makeOrg({ email: "org.pets@email.com" }),
      passwordHash: await hash("123456", 6),
    })
  })

  it("should be able to authenticate", async () => {
    const { organization } = await useCase.execute({
      email: "org.pets@email.com",
      password: "123456",
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it("should not be able to authenticate with wrong e-mail", async () => {
    await expect(() => {
      return useCase.execute({
        email: "pets@email.com",
        password: "123456",
      })
    }).rejects.toBeInstanceOf(InvalidCredentials)
  })

  it("should not be able to authenticate with wrong password", async () => {
    await expect(() => {
      return useCase.execute({
        email: "org.pets@email.com",
        password: "123",
      })
    }).rejects.toBeInstanceOf(InvalidCredentials)
  })
})
