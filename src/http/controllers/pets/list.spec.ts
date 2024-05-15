import request from "supertest"
import { makePet } from "test/factories/make-pet"
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"

import { app } from "@/app"
import { createAndAuthOrg } from "@/utils/test/create-and-auth-org"

describe("List Pets (e2e)", () => {
  beforeEach(async () => {})

  beforeAll(async () => {
    await app.ready()

    const { token } = await createAndAuthOrg(app)

    await request(app.server).post("/pets").set("Cookie", token).send(makePet())

    await request(app.server).post("/pets").set("Cookie", token).send(makePet())

    await request(app.server).post("/pets").set("Cookie", token).send(makePet())
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to list pets, filtering by city", async () => {
    const response = await request(app.server).get("/pets").query({
      city: "São Paulo",
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(3)
  })

  it("should be able to list pets, filtering by city and age", async () => {
    const response = await request(app.server).get("/pets").query({
      city: "São Paulo",
      age: 5,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(3)
  })

  it("should be able to list pets, filtering by city and environment", async () => {
    const response = await request(app.server).get("/pets").query({
      city: "São Paulo",
      environment: "outdoor",
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(3)
  })

  it("should be able to list pets, filtering by city and energy", async () => {
    const response = await request(app.server).get("/pets").query({
      city: "São Paulo",
      energy: "high",
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(3)
  })

  it("should be able to list pets, filtering by city and size", async () => {
    const response = await request(app.server).get("/pets").query({
      city: "São Paulo",
      size: "medium",
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(3)
  })
})
