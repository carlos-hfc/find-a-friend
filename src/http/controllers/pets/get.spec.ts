import { randomUUID } from "node:crypto"

import request from "supertest"
import { makePet } from "test/factories/make-pet"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

import { app } from "@/app"
import { prisma } from "@/lib/prisma"
import { createAndAuthOrg } from "@/utils/test/create-and-auth-org"

describe("Get Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
    await createAndAuthOrg(app)
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to get a pet by id", async () => {
    const organization = await prisma.organization.findFirstOrThrow()

    const pet = await prisma.pet.create({
      data: {
        ...makePet(),
        organizationId: organization.id,
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`).send()

    expect(response.statusCode).toEqual(200)
  })

  it("should not be able to get an inexistent pet", async () => {
    const organization = await prisma.organization.findFirstOrThrow()

    await prisma.pet.create({
      data: {
        ...makePet(),
        organizationId: organization.id,
      },
    })

    const response = await request(app.server)
      .get(`/pets/${randomUUID()}`)
      .send()

    expect(response.statusCode).toEqual(404)
  })
})
