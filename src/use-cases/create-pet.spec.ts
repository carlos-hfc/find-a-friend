import { makePet } from "test/factories/make-pet"
import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository"

import { CreatePetUseCase } from "./create-pet"

let petRepository: InMemoryPetRepository
let useCase: CreatePetUseCase

describe("Create Pet", () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    useCase = new CreatePetUseCase(petRepository)
  })

  it("should be able to register a pet", async () => {
    const { pet } = await useCase.execute(makePet())

    expect(pet.id).toEqual(expect.any(String))
    expect(petRepository.items).toHaveLength(1)
  })

  it("should not be able to register a pet with inexistent organization", async () => {
    await expect(() => {
      return useCase.execute(makePet())
    }).rejects.toBeInstanceOf(Error)
  })
})
